

/*
author：许开伟
create-date: 2018-12-29
desc: 网络请求基类
*/

import DeviceInfo from 'react-native-device-info';

import {Alert} from 'react-native';

let instance = null;

const baseUrl = 'http://service.wowoshenghuo.com';

var name = '';

var header = {
	'Content-Type' : 'application/json;charset=UTF-8',
	'source' : DeviceInfo.getSystemName() === 'iOS' ? '2' : '1',
	'sys_version' : DeviceInfo.getSystemVersion(),
	'model' : DeviceInfo.getDeviceName(),
	'imei' : DeviceInfo.getUniqueID(),
	'brand' : DeviceInfo.getBrand(),
	'user_token' : '-1',
	'userToken' : '-1',
}

export default class HttpClientManager {
	constructor() {
	  //单例模式
	  if (!instance) {
	  	instance = this;
	  }
	  return instance;
	}

	/***
	* 类方法
	*/
	static shareInstance() {
		let singleton = new HttpClientManager();
		return singleton;
	}

	/***
	* 实例方法
	*/
	setName(name) {
		this.name = name;
	}

	getName() {
		return this.name;
	}

	//网络请求
	request(url, params) {
		return new Promise(function(resolve, reject){
			let fullUrl = baseUrl + url;
			fetch(fullUrl, {
				method : 'POST',
				headers : header,
				body : JSON.stringify(params),
			})
			.then(response => response.json())
			.then(function(respJson){
				let respData = respJson;
				if (respJson.status === '000000') {
					respData.success = true;
				}else {
					respData.success = false;
					if (respJson.status === '000003' ||
						respJson.status === '010010') {
						respData.logout = true;
					}else {
						respData.logout = false;
						if (respJson.status === '777777') {
							respData.showAlert = true;
						}else {
							respData.showAlert = false;
						}
					}
				}

				resolve(respData);
			})
			.catch(function(error){
				//Alert.alert('error');
				reject(error);
			});
		});
	}



}