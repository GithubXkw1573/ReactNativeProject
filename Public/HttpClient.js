

/*
author：许开伟
create-date: 2018-12-29
desc: 网络请求基类
*/

let instance = null;

var name = '';

const baseUrl = 'http://service.wowoshenghuo.com';

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
}