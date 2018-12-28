'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Button,
  Text,
} from 'react-native';

import Toast from 'react-native-root-toast';

import {Loading} from '../Public/Loading';


class LoadingToast extends Component {

show() {
	let toast = Toast.show('This is a message', {
    duration: 1500, // toast显示时长(LONG,SHORT,自定义毫秒数)
    position: Toast.positions.CENTER, // toast位置(BOTTOM,CENTER,TOP)
    shadow: true, // toast是否出现阴影
    animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
    hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
    delay: 0, // toast显示的延时
    style: styles.toastStyle,
    onShow: () => { 
        // toast出现回调（动画开始时）
    },
    onShown: () => {
        // toast出现回调（动画结束时）
    },
    onHide: () => {
        // toast隐藏回调（动画开始时）
    },
    onHidden: () => {
        // toast隐藏回调（动画结束时）
    }
	});
}

showlong() {
	Toast.show('我是一个很长的提示消息，我还可以换行，我可以定义显示的毫秒数，我还可以显示上面还是下面中间等', {
    duration: Toast.durations.LONG, // toast显示时长(LONG,SHORT,自定义毫秒数)
    position: Toast.positions.CENTER, // toast位置(BOTTOM,CENTER,TOP)
    shadow: true, // toast是否出现阴影
    animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
    hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
    delay: 0, // toast显示的延时
    style: styles.toastStyle,
    onShow: () => { 
        // toast出现回调（动画开始时）
    },
    onShown: () => {
        // toast出现回调（动画结束时）
    },
    onHide: () => {
        // toast隐藏回调（动画开始时）
    },
    onHidden: () => {
        // toast隐藏回调（动画结束时）
    }
	});
}

loading() {
	Loading.show();
}

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.titleStyle}>
        Toast
      </Text>
      <View style={styles.btnStyle}><Button onPress={()=>this.show()} title='show' color='black'/></View>
      <View style={styles.btnStyle}><Button onPress={()=>this.showlong()} title='showLong' color='black'/></View>
      <View style={styles.btnStyle}><Button onPress={()=>this.loading()} title='showSuccess' color='black'/></View>
      <View style={styles.btnStyle}><Button onPress={()=>this.show()} title='showSuccess带回调函数' color='black'/></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'green',
		alignItems: 'stretch',
		padding: 20,
	},
	titleStyle: {
		fontSize: 24,
		height: 40,
	},
	btnStyle: {
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: 'gray',
		marginBottom: 20,
	},
	toastStyle: {
		height: 80,
		width: 100,
	},
});


export default LoadingToast;