'use strict';

import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Loading} from '../Public/Loading';
import {Toast} from '../Public/Toast';
import HttpClient from '../Public/HttpClient';
import '../Public/Global.js';
import md5 from "react-native-md5";

import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  Alert,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';

let btnWidth = global.screen.width-80;
let inputWidth = global.screen.width-120;
let lineWidth = global.screen.width-90;

class loginwowo extends Component {

	static navigationOptions = {
        title: '登陆后本地存储',
    }

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	account:'',
	  	password:'',
	  };
	}

	doLogin() {
		if (this.state.account === '') {
			Alert.alert('蜗蜗生活账户不能为空！');
			return;
		}else if (this.state.password === '') {
			Alert.alert('蜗蜗生活账户密码不能为空！');
			return;
		}else {
			this.requestLogin();
		}
	}

	requestLogin() {
		Loading.show();
      	var self = this;
    	var httpManager = HttpClient.shareInstance();
    	//md5加密
    	let md5_pwd = md5.hex_md5(this.state.password).toUpperCase();
         var param = {
            loginName : this.state.account,
            loginValue : md5_pwd,
            loginType : '1',
        };
        httpManager.request('/user/login/doLogin', param)
        .then(function(response){
        	 Loading.hidden();
           if (response.success) {
           	  Toast.showSuccess('登陆成功');
           	  //登陆成功后，保存登陆账户信息到本机
           	  AsyncStorage.setItem('userInfo',JSON.stringify(response.data),(error)=>{
           	 //  	if (error) {
             //    	alert('存储失败');
            	// } else  {
             //    	alert('存储成功');
            	// }
           	  });
           }else {
           	  Alert.alert(response.message);
           }
        })
        .catch(function(response){
        	 Loading.hidden();
            let failMsg = response.message.length > 0 ? response.message : '系统繁忙，请稍后再试~';
            Alert.alert(failMsg);
        });
    }

  render() {
    return (
      <View style={styles.container}>
      	<Text style={styles.titleStyle}>蜗蜗生活</Text>
      	<View style={styles.inputRowStyle}>
      		<Icon name ='account-circle' color='gray' size={24} />
      		<TextInput clearButtonMode={'while-editing'}
      				   placeholder='请输入手机号码'
      				   placeholderTextColor={'#c7c7cd'}
      				   keyboardType={'number-pad'}
      				   maxLength={25}
      				   returnKeyType={'next'}
      				   autoCorrect={false}
      				   // value={this.state.account}
      				   style={styles.inputStyle}
      				   onChangeText={(text)=>this.setState({account:text})}
      		/>
      	</View>
      	<View style={styles.seplineStyle} />
      	<View style={styles.inputRowStyle}>
      		<Icon name ='onepassword' color={'gray'} size={24} />
      		<TextInput clearButtonMode={'while-editing'}
      				   placeholder='请输入账号密码'
      				   placeholderTextColor={'#c7c7cd'}
      				   keyboardType={'ascii-capable'}
      				   maxLength={18}
      				   returnKeyType={'done'}
      				   autoCorrect={false}
      				   password ={true}
      				   // value={this.state.password}
      				   style={styles.inputStyle}
      				   onChangeText={(text)=>this.setState({password:text})}
      		/>
      	</View>
      	<View style={styles.seplineStyle} />
      	<View style={styles.buttonViewStyle}>
      		<TouchableHighlight underlayColor="#c7c7cd" style={styles.loginStyle} onPress={() => this.doLogin()}>
      		<Text style={styles.buttonStyle}>登陆</Text>
      		</TouchableHighlight>
      	</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		paddingHorizontal: 20,
		paddingTop: 50,
		alignItems: 'center',
	},
	titleStyle: {
		fontSize: 24,
		textAlign: 'center',
		marginBottom: 30,
	},
	inputRowStyle: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: 20,
	},
	buttonViewStyle: {
		alignItems: 'center',
		marginTop: 50,
	},
	inputStyle: {
		color:'#333333',
		fontSize: 16,
		width: inputWidth,
		height: 30,
		marginLeft: 10,
	},
	loginStyle: {
		borderRadius: 5,
		backgroundColor: '#1FB579',
		height: 46,
		width: btnWidth,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonStyle: {
		fontSize: 16,
		color: 'white',
		textAlign: 'center',
	},
	seplineStyle: {
		height: 0.5,
		backgroundColor: '#cccccc',
		width: lineWidth,
		marginTop: 5,
	}
});


export default loginwowo;