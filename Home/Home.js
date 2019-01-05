/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Text, View, Button, Alert,Image,ScrollView, StyleSheet } from 'react-native';
// import MovieList from "./movies/MovieList";
// import MovieDetail from "./movies/MovieDetail";
// import {StackNavigator} from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import HttpClient from '../Public/HttpClient';

var home = require('react-native').NativeModules.HomeViewController;

export default class KevinReactNativeProject extends Component {
    static navigationOptions = {
        title: '首页',
    }

    componentDidMount() {
         // Alert.alert(DeviceInfo.getVersion());
    }

    jump() {
        const { navigate } =this.props.navigation;
        navigate('MovieList');
        // home.jumpToMovieList('传参数过来了', 345);
    }

    study() {
        const { navigate } =this.props.navigation;
        navigate('StudyList');
    }

    onEditAction() {
        Alert.alert(
          '我是一个标题',
          '这是标题的内容文案，你可以写很多字',
            [
            {text: '确定', onPress: () => console.log('OK Pressed')},
            {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ]
        )
    }

    showPopList() {
        // console.log('====='+ActionSheeter);
        ActionSheeter.showPopList(['中国','美国','日本','新加坡'], response=>{
            if (response.didCancel) {
                Alert.alert('取消了');
            }else {
                Alert.alert('您选择了第 '+(response.index+1)+' 个，名称：'+response.item);
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
            <ScrollView >
                <Text style={styles.textStyle}>Hello，World!</Text>
                <Button
                 onPress={() => this.jump()}
                 title="电影列表"
                />
                <Button
                 onPress={() => this.study()}
                 title="学习更多"
                />
                <Button
                 onPress={() => this.showPopList()}
                 title="自定义ActionSheet"
                />
                <Text style={styles.textStyle}>我们使用两种数据来控制一个组件：props和state。props是在父组件中指定，
                而且一经指定，在被指定的是的分公司电饭锅水电费组件的生命周期中则不再改
                变。 对于需要改变的数据，我们需要使用state</Text>
                <View style={styles.horizonStackTextLayout}>
                <Text style={[styles.textStyle,styles.leftTextLayout]}>我是左边的lable,左边更长一点</Text>
                <View style={styles.editBtnStyle}>
                <Button onPress={()=>this.onEditAction()} title="编辑修改" color="#841584"/>
                </View>
                </View>

                <View style={styles.horizonStackTextLayout}>
                    <Image
                        style={styles.leftPicStyle}
                        source={require('../resouces/local.jpg')}
                    />
                    <Image
                        style={styles.rightPicStyle}
                        source={{uri: 'http://filetest.wowoshenghuo.com/picture/mba/20181218/40a58b670bb24ebf81847ae7d9b80e28.jpg'}}
                    />
                    <Image
                        style={styles.rightPicStyle}
                        resizeMode={Image.resizeMode.contain}
                        source={{uri: 'http://filetest.wowoshenghuo.com/picture/mba/20181218/40a58b670bb24ebf81847ae7d9b80e28.jpg'}}
                    />
                </View>

                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    textStyle: {
        lineHeight: 30,
        fontSize: 20,
        marginBottom: 40,
        marginTop: 40,
        marginLeft: 30,
        marginRight: 40,
    },
    libral: {
        fontStyle: 'italic'
    },
    horizonStackTextLayout: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexWrap:'wrap',
        marginRight:40,
    },
    leftTextLayout:{
        width:120,
    },
    editBtnStyle:{
        backgroundColor: '#96e350',
        borderRadius: 10,
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    leftPicStyle: {
        width:100,
        height:100,
        marginLeft:30,
    },
    rightPicStyle: {
        width:100,
        height:100,
        resizeMode:'center'
    }
});
