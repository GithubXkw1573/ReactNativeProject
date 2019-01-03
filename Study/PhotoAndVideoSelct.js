'use strict';

import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import '../Public/Global.js';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

let itemWidth = (global.screen.width-50)/3.0;

const options = {
            title: '选择图片', 
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照', 
            chooseFromLibraryButtonTitle: '选择照片', 
            // customButtons: [
            //     {name: 'fb', title: '自定义按钮'},
            //   ],
            cameraType: 'back',
            mediaType: 'photo',
            videoQuality: 'high', 
            durationLimit: 10, 
            maxWidth: 300,
            maxHeight: 300,
            quality: 0.8, 
            angle: 0,
            allowsEditing: false, 
            noData: false,
            storageOptions: {
                skipBackup: true  
            }
        };

class PhotoAndVideoSelct extends Component {

	static navigationOptions = {
        title: '选择照片&拍照',
    }

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	imageSource1:null,
	  	imageSource2:null,
	  	imageSource3:null,
	  };
	}

	choosePhoto(type){
		if (type === 'single_both') {
			this.pickerPhotoByBoth();
		}else if(type === 'single_libray') {
			this.pickerLibray();
		}else if(type === 'single_take') {
			this.takePhoto();
		}
	}

	//弹出选择拍照、相册选择框
	pickerPhotoByBoth () {
		
        ImagePicker.showImagePicker(options, (response)=>{
        	if (response.didCancel) {
                console.log('取消了');
            }
            else if (response.error) {
                console.log('有错误: ', response.error);
            }
            else if (response.customButton) {
                console.log('自定义按钮被点击: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    imageSource1: source
                });
            }
        });
	}

	//直接拍照
	takePhoto () {
		ImagePicker.launchCamera(options, (response)  => {
    		if (response.didCancel) {
                console.log('取消了');
            }
            else if (response.error) {
                console.log('有错误: ', response.error);
            }
            else {
                // let source = { uri: response.uri };

                // You can also display the image using data:
                let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    imageSource3: source
                });
            }
  		});
	}

	//直接选择相册
	pickerLibray() {
		ImagePicker.launchImageLibrary(options, (response)  => {
			if (response.didCancel) {
	        console.log('取消了');
	        }
	        else if (response.error) {
	            console.log('有错误: ', response.error);
	        }
	        else {
	            // let source = { uri: response.uri };

	            // You can also display the image using data:
	            let source = { uri: 'data:image/jpeg;base64,' + response.data };

	            this.setState({
	                imageSource2: source
	            });
	        }
		});
  	}

  render() {
    return (
      <View style={styles.container}>
      	<Text style={styles.titleStyle}>照片（单选）</Text>
      	<View style={styles.singleSectionStyle}>
      		<TouchableOpacity onPress={() => this.choosePhoto('single_both')}>
      			<View style={styles.imageContainer}>
      				{this.state.imageSource1 === null ? (
      					<View style={styles.imageContainer}><Icon name='add' size={40} color={'green'}/>
	      				<Text style={styles.textStyle}>相册/拍照</Text></View>
      					):(
      					<Image style={styles.imgStyle} resizeMode='cover' source={this.state.imageSource1} />
      				)}
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.choosePhoto('single_libray')}>
      			<View style={styles.imageContainer}>
      				{this.state.imageSource2 === null ? (
      					<View style={styles.imageContainer}><Icon name='add' size={40} color={'green'}/>
	      				<Text style={styles.textStyle}>相册</Text></View>
      					):(
      					<Image style={styles.imgStyle} source={this.state.imageSource2} />
      				)}
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.choosePhoto('single_take')}>
      			<View style={styles.imageContainer}>
      				{this.state.imageSource3 === null ? (
      					<View style={styles.imageContainer}><Icon name='add' size={40} color={'green'}/>
	      				<Text style={styles.textStyle}>拍照</Text></View>
      					):(
      					<Image style={styles.imgStyle} source={this.state.imageSource3} />
      				)}
                </View>
            </TouchableOpacity>
      	</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	titleStyle: {
		fontSize: 18,
		height: 40,
		backgroundColor: 'gray',
		padding: 10,
	},
	singleSectionStyle: {
		flexDirection:'row',
		justifyContent: 'space-around',
		marginTop: 15,
	},
	imageContainer: {
		height: itemWidth ,
		width: itemWidth ,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
	},
	textStyle: {
		textAlign: 'center',
		marginTop: 10,
		fontSize: 15,
		color: 'green',
	},
	imgStyle: {
		height: itemWidth ,
		width: itemWidth ,
		backgroundColor: '#f5f5f5',
		flex: 1,
	}
});


export default PhotoAndVideoSelct;