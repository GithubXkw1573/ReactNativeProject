/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Homepage from "./Home/Home";
import MovieList from "./movies/MovieList";
import MovieDtail from "./movies/MovieDetail";

//各个页面路由配置
const RouteConfigs = {
    Home: { //首页
        screen: Homepage,
        navigationOptions: {
            title: "首页"
        }
    },
    MovieList: { //电影列表
        screen: MovieList,
        navigationOptions: {
            title: "电影列表"
        }
    },
    MovieDtail: { //电影详情
        screen: MovieDtail,
        navigationOptions: {
            title: "电影详情"
        }
    },
}

//导航器的配置，包括导航器的初始页面、各个页面之间导航的动画、页面的配置选项等等
const NavigatorConfig = {
    initialRouteName: 'Home', // 默认显示界面
    //headerMode: 'none', //https://reactnavigation.org/docs/navigators/stack#StackNavigatorConfig

}

//导航注册
const RootNavigator = StackNavigator(RouteConfigs, NavigatorConfig);
export default RootNavigator;