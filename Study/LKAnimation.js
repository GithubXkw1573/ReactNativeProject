import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View, ScrollView, Image,LayoutAnimation,TouchableOpacity} from 'react-native';
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
// LayoutAnimation
class LKLayoutView extends Component {
    constructor(props){
        super(props)
        this.state = {
            w:200,
            h:20,
            showNewOne:false 
        }
    }
    pressAction() {
        let thisPage = this
        //下面代表的是当有布局改变的时候会以动画的形式过渡，
        LayoutAnimation.configureNext({
            duration: 1200,  //持续时间
            create: ({//新布局的动画类型
                type: 'linear', //线性模式  spring 弹跳  linear 线性  easeInEaseOut缓入淡出  easeIn缓入   easeOut缓出  keyboard键入
                property:'opacity' //动画属性
            }),
            update: ({ //布局更新的动画类型
                type:'spring',
                springDamping: 0.4  //弹跳阻尼系数

            })
        })
        if (this.state.h<100){
            thisPage.setState({
                w:this.state.w + 30,
                h:this.state.h + 30,
                showNewOne : true,
            })
        }
       
    }
    render(){

        return (
            <View style={{...this.props.style}}>
                <View style={{backgroundColor:'yellow',width:this.state.w,height:this.state.h}}>
                    <Text style={{textAlign:'center',lineHeight:this.state.h}}>这个是现成的</Text>
                </View>
                {this.state.showNewOne ?(
                <View style={{backgroundColor:'purple',width:this.state.w,height:this.state.h}}>
                    <Text style={{textAlign:'center',lineHeight:this.state.h}}>这个是新添加的</Text>
                </View>
            ):null}
            {/* 下面的onPress绑定的方法，如果需要修改state的值，必须要bind(this),否则state获取不到 */}
                <TouchableOpacity onPress={this.pressAction.bind(this)}>
                    <View style={{width:100,height:50,backgroundColor:'black'}}>
                        <Text style={{color:'white',textAlign:'center',lineHeight:50}}>点击开始</Text>
                    </View>
                </TouchableOpacity>
            </View>
            
           
            

        )

    }

}

// 使用props,直接动态改变style(优化版)使用的是setNativeProps
class LKChangePropsView extends Component {
    constructor(props){
        super(props)
        this.state = {
            w:200,
            h:20,
            showNewOne:false 
        }
    }
    pressAction() {
        let thisPage = this
        //下面代表的是当有布局改变的时候会以动画的形式过渡，
        LayoutAnimation.configureNext({
            duration: 1200,  //持续时间
            create: ({//新布局的动画类型
                type: 'linear', //线性模式  spring 弹跳  linear 线性  easeInEaseOut缓入淡出  easeIn缓入   easeOut缓出  keyboard键入
                property:'opacity' //动画属性
            }),
            update: ({ //布局更新的动画类型
                type:'spring',
                springDamping: 0.4  //弹跳阻尼系数

            })
        })
        if (this.state.h<100){
            thisPage.setState({
                w:this.state.w + 30,
                h:this.state.h + 30,
                showNewOne : true,
            })
        }
       
    }
    render(){

        return (
            <View style={{...this.props.style}}>
                <View style={{backgroundColor:'yellow',width:this.state.w,height:this.state.h}}>
                    <Text style={{textAlign:'center',lineHeight:this.state.h}}>这个是现成的</Text>
                </View>
                {this.state.showNewOne ?(
                <View style={{backgroundColor:'purple',width:this.state.w,height:this.state.h}}>
                    <Text style={{textAlign:'center',lineHeight:this.state.h}}>这个是新添加的</Text>
                </View>
            ):null}
            {/* 下面的onPress绑定的方法，如果需要修改state的值，必须要bind(this),否则state获取不到 */}
                <TouchableOpacity onPress={this.pressAction.bind(this)}>
                    <View style={{width:100,height:50,backgroundColor:'black'}}>
                        <Text style={{color:'white',textAlign:'center',lineHeight:50}}>点击开始</Text>
                    </View>
                </TouchableOpacity>
            </View>
            
           
            

        )

    }

}



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
                <LKLayoutView style={{marginTop: 20,}}></LKLayoutView>
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

