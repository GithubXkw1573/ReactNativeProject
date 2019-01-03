import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View, ScrollView, Image} from 'react-native';
// Animated 可用的动画组件是Text，View，ScrollView和Image，
class FadeInView extends React.Component {
    state = {
      fadeAnim: new Animated.Value(0),  // 透明度初始值设为0
    }
  
    componentDidMount() {
      Animated.timing(                  // 随时间变化而执行动画
        this.state.fadeAnim,            // 动画中的变量值
        {
          toValue: 1,                   // 透明度最终变为1，即完全不透明
          duration: 10000,              // 让动画持续一段时间
        }
      ).start();                        // 开始执行动画
    }
  
    render() {
      let { fadeAnim } = this.state;
  
      return (
        <Animated.View                 // 使用专门的可动画化的View组件
          style={{
            ...this.props.style,
            opacity: fadeAnim,         // 将透明度指定为动画变量值
          }}
        >
          {this.props.children}
        </Animated.View>
      );
    }
  }


  //弹跳动画
  class ScringView extends React.Component {
    state = {
        bounceValue: new Animated.Value(0),  // 透明度初始值设为0
    }
  
    componentDidMount() {
        this.state.bounceValue.setValue(1.5)
      Animated.spring(                  // 随时间变化而执行动画
        this.state.bounceValue,            // 动画中的变量值
        {
          toValue: 0.8,                   // 最后的值
          friction: 2,              // 摩擦力
        }
      ).start();                        // 开始执行动画
    }
  
    render() {
      let { fadeAnim } = this.state;
  
      return (
        <Animated.View                 // 使用专门的可动画化的View组件
          style={{
            ...this.props.style,
            transform:[
                {scale:this.state.bounceValue}
            ],      // 设置值
            
          }}
        >
          {this.props.children}
        </Animated.View>
      );
    }
  }
// 组合动画


export default class LKAnimation extends Component {
    static navigationOptions = {
        title:'动画'
    }
    constructor(props){
        super(props)
        this.state = {
            
        }   
    }
    //用于改变state操作，只调用一次
    componentWillMount(){

    }
    // 组件渲染函数
    render(){
       

        return (
            <ScrollView style = {styles.background} contentContainerStyle={{flex:1,alignItems: 'center',flexDirection: "column",}}>
                <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
                    <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
                </FadeInView>
                <ScringView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
                    <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
                </ScringView>
            </ScrollView>
        )
    }
    // render之后，主要是网络请求，定时器等操作
    componentDidMount(){
       
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
        console.log('组件销毁了')
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

