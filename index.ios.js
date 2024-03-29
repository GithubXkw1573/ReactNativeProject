/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Text, View, Button, Alert,Image,ScrollView, StyleSheet } from 'react-native';
import HomePage from './Home/Home.js';
import MovieList from "./movies/MovieList";
import MovieDetail from "./movies/MovieDetail";
import StudyList from './Study/studyList';
import LoadingToast from './Study/LoadingToast';
import PickerView from './Study/PickerView';
import ServiceList from './Study/ServiceList';
import TextInput from './Study/TextInput';
import LKLocation from './Study/LKLocation';
import LKAnimation from './Study/LKAnimation';
import PhotoAndVideoSelct from './Study/PhotoAndVideoSelct';
import LoginWowo from './Study/loginwowo';
import {StackNavigator} from 'react-navigation';
import './Public/Global.js';


//页面路由
const KevinReactNativeProject = StackNavigator({
    Home:{
        screen:HomePage,
    },
    MovieList:{
        screen:MovieList,
    },
    Details:{
        screen:MovieDetail,
    },
    StudyList:{
        screen:StudyList,
    },
    LoadingToast:{
        screen:LoadingToast,
    },
    Picker:{
        screen:PickerView,
    },
    ServiceList: {
        screen:ServiceList
    },
    TextInput: {
        screen:TextInput,
    },
    LKLocation: {
        screen:LKLocation,
    },
    LKAnimation: {
        screen: LKAnimation,
    },
    PhotoAndVideoSelct: {
        screen:PhotoAndVideoSelct,
    },
    LoginWowo: {
        screen:LoginWowo,
    },
},
{
    initialRouteName: 'Home',
    headerMode: 'float',
    navigationOptions: {
      headerBackTitle: '返回'
    },
}
);



AppRegistry.registerComponent('KevinReactNativeProject', () => KevinReactNativeProject);
