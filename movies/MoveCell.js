/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Dimensions, Image, Text, TouchableOpacity, 
    View, Alert, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MovieDetail from './MovieDetail.js';

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width;

export default class MoveCell extends Component {

    constructor(props) {
        super(props);
    }

    jumpToDetail(id) {
        // Alert.alert('点击行:'+id);
        const { navigate } =this.props.navigation;
        navigate('Details', this.props.item);
    }

    render() {
        var item = this.props.item;
        return (
            <View >
            <TouchableOpacity onPress={() => this.jumpToDetail(item.id)}>
            <View style={styles.container}>
            <Image style={styles.picStyle} source={{uri:item.picUrl}} />
            <View style={styles.rightStyle}>
             <Text style={styles.titleStyle}>{item.name}</Text>
             <Text style={styles.scoreStyle}>{item.score}</Text>
             <Text style={styles.descStyle} numberOfLines={2}>{item.desc}</Text>
            </View>
            </View>
            <View style={styles.bottomLineStyle}/>
            </TouchableOpacity>
            </View>);
    }
}

const styles = StyleSheet.create({
    mainStyle: {

    },
    bottomLineStyle: {
        height: 0.5,
        marginLeft: 15,
        backgroundColor: 'gray',
    },
    container: {
        flex: 1,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
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

    },
    scoreStyle: {
        fontSize: 18,
        color: 'green',
        marginTop:10,
    },
    descStyle: {
        fontSize: 18,
        marginTop:10,
        lineHeight:24,
    },
});
