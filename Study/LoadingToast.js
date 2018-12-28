'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Button,
  Text,
} from 'react-native';

import RootToast from 'react-native-root-toast'

class LoadingToast extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.titleStyle}>
        Toast
      </Text>
      <View style={styles.btnStyle}><Button title='show' color='black'/></View>
      <View style={styles.btnStyle}><Button title='showLong' color='black'/></View>
      <View style={styles.btnStyle}><Button title='showSuccess' color='black'/></View>
      <View style={styles.btnStyle}><Button title='showSuccess带回调函数' color='black'/></View>
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
});


export default LoadingToast;