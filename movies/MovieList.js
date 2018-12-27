/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Alert, Text, Image, View, Platform } from 'react-native';
import MoveCell from './MoveCell.js'; 


export default class MovieList extends Component {
    static navigationOptions = {
        title: '电影列表',
    }
    _keyExtractor = (item, index) => item.id;

    constructor(props) {
        super(props);
        this.state = {
            data:[]
        }
    }

    componentDidMount() {
        dataList = [
                {
                    id:1,
                    name: '这个杀手不太冷',
                    score: '9.6分',
                    picUrl: 'http://filetest.wowoshenghuo.com/picture/mba/20181218/40a58b670bb24ebf81847ae7d9b80e28.jpg',
                    desc: '则从数据源中逐个解析数据，然后返回一个设定好格式的组件来渲染。从数据源中逐个解析数据，\
                    后返回一个设定好格式的组件来渲染。从数据源中逐个解析数据，然后返回一个设定好格式的组件来渲染，\
                    从数据源中逐个解析数据，然后返回一个设定好格式的组件来渲染；的组件来渲的组件来渲,源中逐个解析数据，\
                    然后返回一个设定好格式的组件来渲染；的组件来.源中逐个解析数据，然后返回一个设定好格式的组件来渲染；\
                    的组件来.源中逐个解析数据，然后返回一个设定好格式的组件来渲染；的组件来.'
                },
                {
                    id:2,
                    name: '泰坦尼克号',
                    score: '9.5分',
                    picUrl: 'http://filetest.wowoshenghuo.com/picture/mba/20181218/40a58b670bb24ebf81847ae7d9b80e28.jpg',
                    desc: '则从数据源中逐个解析数据'
                },
                {
                    id:3,
                    name: '大话西游',
                    score: '9.4分',
                    picUrl: 'http://filetest.wowoshenghuo.com/picture/mba/20181218/40a58b670bb24ebf81847ae7d9b80e28.jpg',
                    desc: '则从数据源中逐个解析数据，然后返回一个设定好格式的组件来渲染。'
                },
                {
                    id:4,
                    name: '大明王朝1566',
                    score: '9.7分',
                    picUrl: 'http://filetest.wowoshenghuo.com/picture/mba/20181218/40a58b670bb24ebf81847ae7d9b80e28.jpg',
                    desc: '则从数据源中逐个解析数据，然后返回一个设定好格式的组件来渲染。'
                },
                {
                    id:5,
                    name: '钢铁侠',
                    score: '8.6分',
                    picUrl: 'http://filetest.wowoshenghuo.com/picture/mba/20181218/40a58b670bb24ebf81847ae7d9b80e28.jpg',
                    desc: '则从数据源中逐个解析数据，然后返回一个设定好格式的组件来渲染。'
                },
                {
                    id:6,
                    name: '世界末日',
                    score: '9.1分',
                    picUrl: 'http://filetest.wowoshenghuo.com/picture/mba/20181218/40a58b670bb24ebf81847ae7d9b80e28.jpg',
                    desc: '则从数据源中逐个解析数据，然后返回一个设定好格式的组件来渲染。'
                },
                {
                    id:7,
                    name: '恐怖游轮',
                    score: '9.2分',
                    picUrl: 'http://filetest.wowoshenghuo.com/picture/mba/20181218/40a58b670bb24ebf81847ae7d9b80e28.jpg',
                    desc: '则从数据源中逐个解析数据，然后返回一个设定好格式的组件来渲染。'
                },
                {
                    id:8,
                    name: '指环王2',
                    score: '8.8分',
                    picUrl: 'http://filetest.wowoshenghuo.com/picture/mba/20181218/40a58b670bb24ebf81847ae7d9b80e28.jpg',
                    desc: '则从数据源中逐个解析数据，然后返回一个设定好格式的组件来渲染。'
                },
            ];

            this.setState({
                data:dataList
            });
    }

    render() {
        return (
            <View style={styles.container}>
            <FlatList
            data = {this.state.data}
            keyExtractor = {this._keyExtractor} 
            renderItem={({item}) =>
                <MoveCell item={item} navigation={this.props.navigation} />
            }
            //refreshing={this.state.refreshing} // 是否刷新 ，自带刷新控件
            
            />
            </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 60,
    },
    line: {
        height: 1,
        width: "86%",
        backgroundColor: "#CED0CE",
        marginLeft: "14%"
    },
    rightPicStyle: {
        width:100,
        height:100,
        resizeMode:'center'
    }
});

AppRegistry.registerComponent('MovieList', () => MovieList);
