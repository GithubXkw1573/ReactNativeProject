'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Button,
  Text,
} from 'react-native';

import {Toast} from '../Public/Toast';
import {Loading} from '../Public/Loading';


class LoadingToast extends Component {

	static navigationOptions = {
        title: 'ToastLoading',
    }

toast(type) {
    switch (type) {
      case 'show':
        Toast.show('这是show类型')
        break
      case 'showLong':
        Toast.showLong('这是showLong类型')
        break
      case 'showSuccess':
        Toast.showSuccess('这是showSuccess类型')
        break
      case 'showSuccessCallback':
        Toast.showSuccess('这是showSuccessCallback类型', () => alert('回调成功！'))
        break
      case 'showLongSuccess':
        Toast.showLongSuccess('这是showLongSuccess类型')
        break
      case 'showLongSuccessCallback':
        Toast.showLongSuccess('这是showLongSuccessCallback类型', () => alert('回调成功！'))
        break
      case 'showWarning':
        Toast.showWarning('这是showWarning类型')
        break
      case 'showError':
        Toast.showError('这是showError类型')
        break
    }
  }

loading(type) {
	
	switch (type) {
      case 'show':
        Loading.show();
        setTimeout(function(){
        	Loading.hidden();
        }, 3000);
        break
      case 'showText':
        Loading.showText('正在加载...');
        setTimeout(function(){
        	Loading.hidden();
        }, 3000);
        break
      case 'hidden':
        Loading.hidden();
        break
    }
}

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.titleStyle}>
        Toast
      </Text>
      <View style={styles.btnStyle}><Button onPress={()=>this.toast('show')} title='show' color='black'/></View>
      <View style={styles.btnStyle}><Button onPress={()=>this.toast('showLong')} title='showLong' color='black'/></View>
      <View style={styles.btnStyle}><Button onPress={()=>this.toast('showSuccess')} title='showSuccess' color='black'/></View>
      <View style={styles.btnStyle}><Button onPress={()=>this.toast('showSuccessCallback')} title='showSuccess带回调函数' color='black'/></View>
      <View style={styles.btnStyle}><Button onPress={()=>this.toast('showError')} title='showError' color='black'/></View>
      
      <Text style={styles.titleStyle}>
        Loading
      </Text>
      <View style={styles.btnStyle}><Button onPress={()=>this.loading('show')} title='show' color='black'/></View>
      <View style={styles.btnStyle}><Button onPress={()=>this.loading('showText')} title='showText' color='black'/></View>
      <View style={styles.btnStyle}><Button onPress={()=>this.loading('hidden')} title='hidden' color='black'/></View>
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