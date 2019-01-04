import React, { Component } from 'react';
import { Animated,Easing, StyleSheet, Text, View, ScrollView, Image,LayoutAnimation,TouchableOpacity,PanResponder} from 'react-native';
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
// 下面是监听值的改变
    //   this.state.bounceValue.addListener(value=>{
    //       console.log(value)
    //   })
    //这个是暂停动画
    // this.state.bounceValue.stopAnimation(value=>{

    // })
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

//   手势交互动画
  class ResponderView extends Component {
    constructor(props){
        super(props)
        this.state = {
            transY:new Animated.Value(0),
            opacity:new Animated.Value(1),
        }
        this._panResponder = {}
    }
    //预先创建手势响应器
    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder:this._returnTrue.bind(this),
            onMoveShouldSetPanResponder: this._returnTrue.bind(this),
            onPanResponderEnd: this._stopPanAction.bind(this),
            //手势开始处理
            //手势移动时的处理
            onPanResponderMove :Animated.event([null,{
                dx : this.state.transY,
            }]),
            onPanResponderGrant: () => {
                Animated.timing(this.state.opacity,{
                    toValue:   this.state.transY.interpolate({
                        inputRange:[-100,0,100],
                        outputRange:[0,1,0]
                    }),
                    duration:0,
                }).start()

            }
        })
    }
    _stopPanAction(e,gestureState) {
        console.log(e,gestureState)
        this.state.transY.setValue(0)
        this.state.opacity.setValue(1)
        this.setState({transY:this.state.transY,opacity:this.state.opacity})
        return true
    }
    _returnTrue(e,gestureState) {
        console.log(e,gestureState)
        return true
    }
  
    render() {
      return (
        <View style={{...this.props.style}}>
            <Animated.View                 // 使用专门的可动画化的View组件
                style={{
                width: 100,
                height: 50,
                opacity:this.state.opacity,
                transform :[{translateX:this.state.transY}],
                backgroundColor:'red'
                }}
                
            >
                <Text style={{color:'white',lineHeight:50}}>这个是动画效果</Text>
            </Animated.View>
            <TouchableOpacity>
                <View style={{width:100,height:100,backgroundColor:'black'}} {...this._panResponder.panHandlers}>
                    <Text style={{color:'white',lineHeight:100}}>你来摸我啊</Text>
                </View>
            </TouchableOpacity>
        </View>
      )
    }
  }



    //动画组
    class AnimationGroupView extends React.Component {
        state = {
            bounceValue: new Animated.Value(0),  // 透明度初始值设为0
            rotationA : new Animated.Value(0),
        }
      
        animate() {
            this.state.rotationA.setValue(0)
            Animated.timing(
                this.state.rotationA,
                {
                    toValue: 360,
                    duration:800,
                    easing:Easing.linear  //线性
                }
            ).start(() => this.animate())
        }
        componentDidMount() {
            this.state.bounceValue.setValue(3)
            var dec = Animated.decay(   // 以一个初始速度开始并且逐渐减慢停止
                this.state.rotationA,
                {
                    toValue: 360,
                    velocity:1,   //起始速度
                    deceleration:0.999, //速度衰减比例，默认0.997
                    duration:3000
                }
              )
            var spr = Animated.spring
            Animated.parallel([
                spr(                  // 随时间变化而执行动画
                    this.state.bounceValue,            // 动画中的变量值
                    {
                      toValue: 0.8,                   // 最后的值
                      friction: 1,              // 摩擦力
                      duration:5000
                    }
                ),                     
                dec
                ]).start(() => this.animate())
          

        }
      
        render() {
      
          return (
            <Animated.View                 // 使用专门的可动画化的View组件
              style={{
                ...this.props.style,
                transform:[
                        {scale:this.state.bounceValue},
                        {rotate:this.state.rotationA.interpolate({
                            inputRange:[0,360],
                            outputRange:['0deg','360deg']
                        })},
                    ],      
                
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
var _s = {
    w:200,
    h:20
}
// 使用props,直接动态改变style(优化版)使用的是setNativeProps (初次试探发现并没有动画效果，这个留着以后探索吧)
class LKChangePropsView extends Component {
    constructor(props){
        super(props)
        this.state = {
            w:200,
            h:20,
        }
    }
   
    pressAction() {
        var count = 0
        if (this.state.h<100){
            while(count++<30){
                requestAnimationFrame(()=>{
                    this.refs.view.setNativeProps({
                        style:{
                            width : ++_s.w,
                            height: ++_s.h,
                        }
                    })
                })
            }
        }   
        
       
    }
    render(){

        return (
            <View style={{...this.props.style}}>
                <View ref='view' style={{backgroundColor:'yellow',width:200,height:20,justifyContent:'center'}}>
                    <Text style={{textAlign:'center',backgroundColor:'pink'}}>这个是现成的</Text>
                </View>
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
            <ScrollView style = {styles.background} contentContainerStyle={{alignItems: 'center',flexDirection: "column"}} >
                <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
                    <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
                </FadeInView>
                <ScringView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
                    <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
                </ScringView>
                <AnimationGroupView style={{marginTop: 100,width: 250, height: 50, backgroundColor: 'powderblue'}}>
                    <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>我旋转了吗?</Text>
                </AnimationGroupView>
                <ResponderView style={{marginTop: 100,}}></ResponderView>
                <LKLayoutView style={{marginTop: 20}}></LKLayoutView>
                {/* <LKChangePropsView style={{marginTop: 20}}></LKChangePropsView> */}
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

