'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  Text,
} from 'react-native';

import ServiceCell from './ServiceCell';
import {Toast} from '../Public/Toast';
import {Loading} from '../Public/Loading';
import HttpClient from '../Public/HttpClient';

var page = 1;

class ServiceList extends Component {
	static navigationOptions = {
        title: '日常保洁',
    }

    constructor(props) {
      super(props);
    
      this.state = {
      	data: [],
        showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
        isRefreshing:false,//下拉控制
      };
    }

    //生命周期
    componentDidMount() {
    	//显示loading
    	Loading.showText('正在加载...');
    	//请求接口数据
    	this.fectchService(false);
    }

    fectchService(loadMore) {
      var self = this;
    	if (loadMore) {
    		page ++;
    	}else {
    		page = 1;
    	}
    	var httpManager = HttpClient.shareInstance();
         var param = {
            pageSize : 10,
            areaSearch : {
                levelCount : 2,
                adcode : 320100
            },
            longitude : 118.8275154622396,
            conditionSearch : {
            },
            categoryId : 1282,//日常保洁
            latitude : 31.86814236111111,
            ranking : 1,
            pageNum : page,
        };
        httpManager.request('/services/list/getServiceSearchList', param)
        .then(function(response){
        	 Loading.hidden();
           if (response.success) {
              let newList = self.state.data;
              if (loadMore) {
                newList = newList.concat(response.data.list);
              }else {
                newList = response.data.list;
              }
              self.setState({
                data:newList,
                isRefreshing:false,
                showFoot: response.data.list.length < 10 ? 1 : 0,
              });
           }
        })
        .catch(function(response){
        	 Loading.hidden();
            let failMsg = response.message.length > 0 ? response.message : '系统繁忙，请稍后再试~';
            Toast.showError(failMsg);
        });
    }

    handleRefresh = () => {
        this.setState({
            isRefreshing:true,//tag,下拉刷新中，加载完全，就设置成flase
        });
        this.fectchService(false);
    }

    _onEndReached(){
        //如果是正在加载中或没有更多数据了，则返回
        if(this.state.showFoot != 0 ){
            return ;
        }
        
        //底部显示正在加载更多数据
        this.setState({showFoot:2});
        //获取数据，在componentDidMount()已经请求过数据了
        this.fectchService(true);
    }

    _footer = () => {
        if (this.state.showFoot === 1) {
            return (
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if(this.state.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else if(this.state.showFoot === 0){
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    }

  render() {
    return (
      <View style={styles.container}>
      	<FlatList 
            style={styles.listStyle}
      		  data = {this.state.data}
            keyExtractor = {(item, index) => item.id}
            renderItem={({item}) =>
                <ServiceCell item={item} navigation={this.props.navigation} />
            }
            ListFooterComponent={this._footer}
            refreshing={this.state.isRefreshing}
            onRefresh={this.handleRefresh}
            onEndReachedThreshold={0.1}
            onEndReached={this._onEndReached.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: global.backgroundColor,
	},
  listStyle: {
    paddingTop:6,
  },
  footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
  },
});


export default ServiceList;