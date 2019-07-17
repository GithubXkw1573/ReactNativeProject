# ReactNativeProject
#### 布局

RN的布局思路其实就是Flex布局，关于Flex布局，如果不熟悉的，可以去学习一下[Flex布局](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

先看一下这个电影列表的例子：

![image](https://upload-images.jianshu.io/upload_images/1413134-78e2fc6755cceaa8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

布局很简单，整体上是水平布局，然后右边里面又是一个垂直布局：

![image](https://upload-images.jianshu.io/upload_images/1413134-399cbe91a35c8c13.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

外层的container设置主轴flexDirection为横向布局；rightStyle的主轴设置为column垂直方向布局。

![image](https://upload-images.jianshu.io/upload_images/1413134-41a689ade037b24e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

TouchableOpacity是RN内置的可点击容器，包裹在这个容器的内容均可设置一个onPress()事件。React Native提供了3个组件来做这件事。

1.TouchableHighlight：高亮触摸，用户点击时，会产生高亮效果。

2.TouchableOpacity：透明触摸。用户点击时，点击的组件会出现透明效果。

3.TouchableWithoutFeedback：无反馈性触摸。用户点击时无任何视觉效果。

#### 动态变量：state

RN 变量分两种：props和state。props一般是不变的属性。

而变化的属性则需要使用state。

比如下面滚动scrolllist, 根据滚动距离，动态改变导航栏的透明度：

![image](https://upload-images.jianshu.io/upload_images/1413134-cbc6eb54261bfb09.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image](https://upload-images.jianshu.io/upload_images/1413134-e8b018300a947e95.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

首先，我们在构造函数（初始化）声明一个state:

> this.state = {
> 
> headOpactiy:'rgba(28,48,68,0)',  //这里初始化一个背景色，第四个参数表示alpha
> 
> }

然后在监听滚动的函数里根据滚动距离，计算alpha值:

![image](https://upload-images.jianshu.io/upload_images/1413134-63835ae7cc5ec4e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

上述方法最后一句很重要，表示要重新设置state变量的值：

> this.setState({headOpactiy:color});

这句话执行后，会自动触发render()方法将UI重新绘制更新。这就是React的精华所在。

最后我们看render()里面相关设置背景色的代码：

![image](https://upload-images.jianshu.io/upload_images/1413134-2b61d65cbf6b61f7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这样，就实现了滚动时不断改变导航栏的透明度的需求。核心就是利用了state的值变化自动执行render()UI重新渲染来改变UI的。

#### RN的生命周期

RN 页面其实跟客户端一样，都有生命周期的概念，下面我们可以了解一下RN的生命周期的主要方法：

1.constructor(props) 类似于iOS的init()

2.componentWillMount()  类似于iOS的 viewWillAppear()

3.componentDidMount() 类似于iOS的 viewDidAppear()

3.componentWillUpdate() 

4.componentDidUpdate（）

5.componentWillUnmount（）//页面即将移除，类似viewWillDisAppear()

可以看到，其实生命周期大致和客户端的差不多，学习的时候可以和客户端相应的方法联系起来看，就很好理解了。

#### RN的网络请求

> fetch(url,{params})...

这只是简单的api, 实战项目中，网络请求都需要单独封装成一个网络层。这里贴一下我自己项目中的核心方法：

```
//网络请求
async request(url, params) {
await this.readToken();
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
```
这里用到了Promise语法，PromiseES6以后推出的语法，它的好处是在处理多次异步嵌套的时候非常管用。特别推荐大家去学习，同样还是推荐阮一峰老师的博客ES6语法语法教程：[ECMAScript 6 入门](http://es6.ruanyifeng.com).

其实，要讲的还有很多，可以很多真的不知如何去描述，后面有空再贴出来我的项目github地址：[ReactNative自学项目](https://github.com/GithubXkw1573/ReactNativeProject)。

最后，希望感兴趣的小伙伴交流~

运行效果页面：

![首页](https://upload-images.jianshu.io/upload_images/1413134-7b6c94b308dfb9dd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/1413134-9e044fe2bcde6599.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/1413134-15326f6f54c05777.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/1413134-639028d799ce2c6a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
