/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, TouchableOpacity, Text, Image, 
    Button, View, Platform, Dimensions, ScrollView , StatusBar , Alert ,
    BVLinearGradient} from 'react-native';
import { StackNavigator } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const isIphoneX = SCREEN_HEIGHT > 800 ? true : false;
const StatusBarHeight = isIphoneX ? 44 : 20 ;
const NaviBarHeight = 44;

export default class MovieDetail extends Component {
	// static navigationOptions = {
 //        title: '电影详情',
 //    }

 	constructor(props) {
    	super(props);
        this.state = {
            isOnePress:false,
            isTwoPress:false,
            headOpactiy:'rgba(28,48,68,0)',
		}
        var React = require('react-native');
        var {Platform} = React;
        this.platform = Platform;
    }

    static navigationOptions = {
        header: null,
    }

    componentDidMount() {
        // Alert.alert(this.platform.OS);
    }

    changeButtonAction(index) {
    	if (index == 1) {
    		let state = this.state.isOnePress;
    		state = state ? false : true;
    		this.setState({isOnePress:state});
    	}else {
    		let state = this.state.isTwoPress;
    		state = state ? false : true;
    		this.setState({isTwoPress:state});
    	}
    }
    //监听滚动
    _changeScroll(e){
        console.log(e.nativeEvent);
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var opacity = 0;
        if (offsetY>0) {
            if (offsetY <= 64) {
                opacity = offsetY/64.0;
            }else {
                opacity = 1;
            }
        }
        var color = 'rgba(28,48,68,' + opacity + ')';
        this.setState({headOpactiy:color});
    }

    render() {
    	var item = this.props.navigation.state.params;
    	let typetext = '中国大陆 香港 / 动作 / 科幻 / 恐怖 /\n2018-12-21/ 片长 107分钟>';
        return (
        	<View style={styles.containerStyle}>
                <StatusBar
                    backgroundColor={'blue'}
                    translucent={true}
                    barStyle={'light-content'}
                    networkActivityIndicatorVisible={true}
                />
        		<View style={[styles.headerStyle,{backgroundColor:this.state.headOpactiy}]}>
        			<TouchableOpacity style={styles.headerBackTouchStyle} onPress={() => this.props.navigation.goBack()}>
        				<Image style={styles.headerBackStyle} source={require('../resouces/return_black.png')} />
        			</TouchableOpacity>
        			<Text style={styles.headerTitleStyle}>电影</Text>
        		</View>
                <LinearGradient colors={['#284766','#1c3044']} style={styles.backgroundViewStyle}>
        		<ScrollView style={styles.scollerStyle} onScroll={this._changeScroll.bind(this)}
                 scrollEventThrottle={60}>
        			<View style={styles.baseInfoStyle}>
        				<Image style={styles.picStyle} source={{uri:item.picUrl}} />
        				<View style={styles.rightStyle}>
      						<Text style={styles.titleStyle}>{item.name}</Text>
      						<Text style={styles.scoreStyle}>{item.score}</Text>
             				<Text style={styles.typeStyle} numberOfLines={2}>{typetext}</Text>
      					</View>
        			</View>
        			<View style={styles.buttonsSectionStyle}>
        				<View style={[styles.buttonStyle,{backgroundColor:this.state.isOnePress?'orange':'white'}]}>
        					<Button  onPress={() => this.changeButtonAction(1)} title='想看' 
        					color={this.state.isOnePress ? 'white' : 'black'} />
        				</View>
        				<View style={[styles.buttonStyle,{backgroundColor:this.state.isTwoPress?'orange':'white'}]}>
        					<Button onPress={() => this.changeButtonAction(2)} title='看过' 
        					color={this.state.isTwoPress ? 'white' : 'black'} />
        				</View>
        			</View>
        			<View style={styles.infoSectionStyle}>
        				<Text style={styles.infoTitleStyle}>剧情简介</Text>
        				<Text style={styles.infoDescStyle}>{item.desc}</Text>
        			</View>
        		</ScrollView>
                </LinearGradient>
        	</View>
        	);
    }

}

const styles = StyleSheet.create({
	containerStyle: {
		backgroundColor: '#284766',
		flex: 1,
	},
	headerStyle: {
		height: NaviBarHeight + StatusBarHeight,
		backgroundColor: 'rgba(28,48,68,0)',
		flexDirection: 'row',
		justifyContent: 'center',
        opacity: 1,
        // position: 'absolute',
        // top: 100,
        // left: 0,
	},
	headerBackTouchStyle: {
		position: 'absolute',
		top: StatusBarHeight,
		left: 5,
		height : 44,
		width: 60,
	},
	headerBackStyle: {
		marginTop: 7,
		marginLeft: 10,
		height : 30,
		width: 30,
	},
	headerTitleStyle: {
		marginTop: StatusBarHeight + 13,
		// marginLeft:30,
		fontSize: 20,
        color: 'white',
	},
    backgroundViewStyle: {
        // backgroundColor: '#284766',
        flex: 1,
        flexDirection: 'column',
    },
	scollerStyle: {
		// backgroundColor: '#1c3044',
		// flex: 1,
	},
	baseInfoStyle: {
		//height: 200,
		flexDirection: 'row',
		padding: 15,
		marginTop: 15,
	},
	picStyle:{
        backgroundColor: "#f5f5f5",
        width: 100,
        height: 120,
        borderRadius: 5,
    },
    rightStyle:{
        flex: 1,
        paddingLeft: 15,
        flexDirection: 'column',
    },
    titleStyle: {
        fontSize: 24,
        fontWeight:'bold',
        color: 'white',
        backgroundColor: 'transparent',
    },
    scoreStyle: {
        fontSize: 18,
        color: 'white',
        marginTop:10,
        backgroundColor: 'transparent',
    },
    typeStyle: {
    	fontSize: 15,
        marginTop:10,
        lineHeight:22,
        color:'#cccccc',
        backgroundColor: 'transparent',
    },
    buttonsSectionStyle: {
    	flexDirection: 'row',
    	justifyContent: 'flex-end',
    	
    },
    buttonStyle: {
    	height:46,
    	width:90,
    	backgroundColor: 'white',
    	marginRight: 20,
    	padding: 5,
    	borderRadius: 5,
    },
    infoSectionStyle: {
    	margin: 15,
    	flex: 1,
    },
    infoTitleStyle: {
    	fontSize: 20,
        fontWeight:'bold',
        color: 'white',
        backgroundColor: 'transparent',
    },
    infoDescStyle: {
    	marginTop:20,
    	fontSize: 18,
        color: 'white',
        lineHeight: 30,
        backgroundColor: 'transparent',
    },

});