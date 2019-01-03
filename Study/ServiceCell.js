'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';

class ServiceCell extends Component {

	constructor(props) {
	  super(props);
	  this.item = this.props.item;
	  this.state = {};
	}

	jumpToDetail() {

	}

  render() {
  	
    return (
      <View style={styles.container}>
      	<TouchableOpacity onPress={() => this.jumpToDetail()}>
      		<View style={styles.mainStyle}>
      			<Image style={styles.picStyle} source={{uri:this.item.servicePictureUrl}} />
            	<View style={styles.rightStyle}>
             		<Text style={styles.titleStyle}>{this.item.serviceTitle}</Text>
             		<View style={styles.serviceTypesStyle}>
             			{this.item.serviceTypeList.map((info,index)=>{
             				return (
             					<View key={index} style={styles.typesItem}>
             						<Image style={styles.iconStyle} source={require('../resouces/service_mode_s.png')} />
             						<Text style={styles.itemTextStyle}>{info.value}</Text>
             					</View>
             				);
             			})}
             		</View>
             		<View style={styles.priceViewStyle}>
             			{this.item.servicePrice > 0 ? (
             				<Text style={styles.priceStyle}>{this.item.servicePrice/100.0+'元'}</Text>
             				):
             				(<Text style={styles.freeStyle}>免费预约</Text>)
             			}
             			{this.item.vipPrice ? (<View style={styles.vipInfoStyle}>
             				<Text style={styles.vippriceStyle}>{'会员价：'+this.item.vipPrice/100.0+'元'}</Text>
             				<Text style={styles.discountStyle}>{this.item.discount+'折'}</Text>
             				</View>
             				):(<Text></Text>)
             			}
             		</View>
             		<View style={styles.lineStyle} /> 
             		<View style={styles.merchantInfoStyle}>
             			<View style={styles.merchantStyle}><Text style={styles.merchantTextStyle}>{this.item.businessType == 1 ? '商户' : '个人'}</Text></View>
             			<Text style={styles.merchantNameStyle} numberOfLines={1}>{this.item.storeName}</Text>
             			<Text style={styles.distanceStyle}>{'27.5km'}</Text>
             		</View>
            	</View>
      		</View>
      	</TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		marginBottom: 6,
	},
	mainStyle: {
		flex: 1,
		flexDirection: 'row',
        justifyContent: 'flex-start',
	},
	picStyle:{
        backgroundColor: "#f5f5f5",
        width: 90,
        height: 95,
        borderRadius: 2,
        margin: 10,
    },
    rightStyle:{
        flex: 1,
        paddingLeft: 5,
        flexDirection: 'column',
    },
    titleStyle: {
        fontSize: 16,
        fontWeight:'bold',
        marginTop:10,
    },
    serviceTypesStyle: {
    	flexDirection: 'row',
    	justifyContent: 'flex-start',
    	alignItems: 'center',
    	marginTop: 10,
    },
    typesItem: {
    	flexDirection: 'row',
    	justifyContent: 'flex-start',
    	alignItems: 'center',
    	marginRight: 6,
    },
    itemTextStyle: {
    	fontSize: 12,
    },
    iconStyle: {
    	width: 12,
    	height: 12,
    	marginRight:3,
    },
    priceViewStyle: {
    	flexDirection: 'row',
    	justifyContent: 'flex-start',
    	alignItems: 'center',
    	marginTop: 10,
    },
    priceStyle: {
    	color: '#ff3432',
    },
    freeStyle: {
    	padding: 3,
    	backgroundColor: '#FFF6E7',
    	color: '#FFA206',
    	fontSize: 12,
    },
    vippriceStyle: {
    	marginLeft: 15,
    	fontSize: 12,
    	
    },
    discountStyle: {
    	marginLeft: 5,
    	fontSize: 12,
    	fontWeight: 'bold',
    	backgroundColor: '#FFA206',
    },
    vipInfoStyle: {
    	flexDirection: 'row',
    	justifyContent: 'flex-start',
    	alignItems: 'center',
    },
    lineStyle: {
    	height:0.5,
    	backgroundColor: '#cccccc',
    	marginTop: 10,
    },
    merchantInfoStyle: {
    	flexDirection: 'row',
    	justifyContent: 'space-between',
    	alignItems: 'center',
    	marginTop: 5,
    },
    merchantStyle: {
    	paddingLeft:6,
    	paddingRight:6,
    	paddingTop:2,
    	paddingBottom:2,
    	borderRadius: 10,
    	backgroundColor: 'orange',
    },
    merchantTextStyle: {
    	color:'white',
    	fontSize:10,
    },
    merchantNameStyle: {
    	fontSize:12,
    	position:'absolute',
    	left: 38,
    	// flex: 1,
    	// flexShrink: 1,
    	right: 60,
    },
    distanceStyle: {
    	color:'gray',
    	fontSize:12,
    	marginRight: 10,
    },
});


export default ServiceCell;