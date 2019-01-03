import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ScrollView} from 'react-native';
export default class LKLocation extends Component {
    watchID = null;
    static navigationOptions = {
        title:'定位'
    }
    constructor(props){
        super(props)
        this.state = {
           initialPosition:'unknown',
           recentPosition:'unknown',
           count : 0
        }   
    }
    //用于改变state操作，只调用一次
    componentWillMount(){

    }
    // 组件渲染函数
    render(){
        return (
            <ScrollView style = {styles.background}>
               <Text style={styles.text1}>当前定位:</Text>
               <Text style={{color:'red'}}>{this.state.initialPosition}</Text>
               <Text style={styles.text1}>持续定位:{''+this.state.count}</Text>
               <Text style={{color:'red'}}>{this.state.recentPosition}</Text>
            </ScrollView>
        )
    }
    // render之后，主要是网络请求，定时器等操作
    componentDidMount(){
        //获取当前位置信息，只调用一次
        // 最后的是设置参数，enableHighAccuracy是否允许高精度，timeout超时时间，maximumAge定位刷新的时间间隔
        navigator.geolocation.getCurrentPosition(
            (location) => {
                var initialPosition = "速度：" + location.coords.speed +
                    "\n经度：" + location.coords.longitude +
                    "\n纬度：" + location.coords.latitude +
                    "\n准确度：" + location.coords.accuracy +
                    "\n行进方向：" + location.coords.heading +
                    "\n海拔：" + location.coords.altitude +
                    "\n海拔准确度：" + location.coords.altitudeAccuracy +
                    "\n时间戳：" + location.timestamp;
                this.setState({initialPosition})
            },
            (error) =>{alert('获取位置失败'+error.message); console.log(error)},
            {enableHighAccuracy:true, timeout: 20000,maximumAge:1000}
        )

        watchID = navigator.geolocation.watchPosition(
            (location) => {
                var recentPosition = "速度：" + location.coords.speed +
                    "\n经度：" + location.coords.longitude +
                    "\n纬度：" + location.coords.latitude +
                    "\n准确度：" + location.coords.accuracy +
                    "\n行进方向：" + location.coords.heading +
                    "\n海拔：" + location.coords.altitude +
                    "\n海拔准确度：" + location.coords.altitudeAccuracy +
                    "\n时间戳：" + location.timestamp;
                var count =  this.state.count + 1
                this.setState({
                    recentPosition:recentPosition,
                    count:count
                })
            },
            (error) => alert('跟踪失败'+error.message),
            // enableHighAccuracy是否允许高精度，timeout超时时间，maximumAge定位刷新的时间间隔，distanceFilter调起刷新的最小距离，useSignificantChanges，当距离有很大的跳跃的时候调用
            // distanceFilter:10,
            {enableHighAccuracy:true, timeout: 20000,maximumAge:1000,useSignificantChanges:false}
        )




    }
    //props改变的时候调用
    componentWillReceiveProps(nextProps){
        console.log('props改变了'+nextProps)
    }
    //state或者props改变的时候调用，返回值决定是否更新
    shouldComponentUpdate(nextProps,nextState){
        console.log('是否需要更新'+nextProps+nextState)
        return true
    }
    //prop和state更新渲染前调用，不可以修改Props和State
    componentWillUpdate(nextProps,nextState){
        console.log('将要更新props和state'+nextProps+nextState)
    }
    //更新之后
    componentDidUpdate(nextProps,nextState){
        console.log('更新props和state之后'+nextProps+nextState)
    }
    //组件销毁调用,销毁定时器和监听的时候在这里操作
    componentWillUnmount(){
        console.log('组件销毁了'+watchID)
        navigator.geolocation.clearWatch(watchID)
        watchID = null
    }

}

const styles = StyleSheet.create({
    background:{
        flex: 1,
        backgroundColor: 'white',
    },
    text1:{
        backgroundColor:'black',
        color:'white',
        textAlign:'center',
        fontSize: 20,
    },

});

