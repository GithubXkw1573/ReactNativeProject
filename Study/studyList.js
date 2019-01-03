/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Alert, Text, Image, View, Platform ,
        TouchableOpacity} from 'react-native';
// import MoveCell from './MoveCell.js'; 


export default class studyList extends Component {
    static navigationOptions = {
        title: '学习计划',
    }
    _keyExtractor = (item, index) => item.id;

    constructor(props) {
        super(props);
        this.state = {
            data:[]
        }
    }

    jumpToDetail(id) {
        // Alert.alert('点击行:'+id);
        const { navigate } = this.props.navigation;
        if (id === 3) {
            navigate('LoadingToast');
        }else if(id === 2) {
            navigate('Picker');
        }else if (id === 8) {
            navigate('ServiceList');
        } else if (id === 1) {
            navigate('TextInput');
        }else if (id == 6) {
            navigate('LKLocation')
        } else if (id == 9) {
            navigate('LKAnimation')
        }else if(id === 5) {
            navigate('PhotoAndVideoSelct');
        }
        else {
            Alert.alert('点击行:'+id);
        }
    }

    componentDidMount() {
        dataList = [
                {
                 id:1,
                    name: 'TextInput',
                },
                {
                    id:2,
                    name: 'Picker&DatePicker',
                },
                {
                    id:3,
                    name: 'Toast&Loading框',
                },
                {
                    id:4,
                    name: 'SectionList',
                },
                {
                    id:5,
                    name: '图片选择、拍照',
                },
                {
                    id:6,
                    name: '定位',
                },
                {
                    id:7,
                    name: '本地化存储',
                },
                {
                    id:8,
                    name: '网络请求、封装网络库',
                },
                {
                    id:9,
                    name: '动画',
                },
            ];

            this.setState({
                data:dataList
            });
    }
    render() {
        return (
            <View style={styles.container}>
            <FlatList
            data = {this.state.data}
            keyExtractor = {this._keyExtractor} 
            renderItem={({item}) =>
                <TouchableOpacity onPress={() => this.jumpToDetail(item.id)}>
                    <Text style={styles.item}>{item.name}</Text>
                    <View style={styles.bottomLineStyle}/>
                </TouchableOpacity>
            }
            
            />
            </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    item: {
        padding: 15,
        fontSize: 18,
        height: 50,
    },
    rightPicStyle: {
        width:100,
        height:100,
        resizeMode:'center'
    },
    bottomLineStyle: {
        height: 0.5,
        marginLeft: 15,
        backgroundColor: 'gray',
    },
});