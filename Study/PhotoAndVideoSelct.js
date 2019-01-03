'use strict';

import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import CropPicker from 'react-native-image-crop-picker'; 
import '../Public/Global.js';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Alert,
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
	  	images:[],
	  	cropImages:[],
	  };
	}

	choosePhoto(type){
		if (type === 'single_both') {
			this.pickerPhotoByBoth();
		}else if(type === 'single_libray') {
			this.pickerLibray();
		}else if(type === 'single_take') {
			this.takePhoto();
		}else if(type === 'mutiple_pick') {
			this.mutiPicker();
		}else if (type === 'take_crop') {
			this.openCamera();
		}else if (type === 'pick_crop') {
			this.mutiCrop();
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

  	//多选
  	mutiPicker() {
  		CropPicker.openPicker({
  			 multiple: true ,
  			 includeBase64: false,
  			 cropping: false ,
  			 maxFiles: 5,
  			 compressImageMaxWidth: 640,
      		 compressImageMaxHeight: 480,
      		 compressImageQuality: 0.5,
  		}).then(images=>{
  			console.log(images);
  			var arr = [];  
  			images.map((img,index)=>{
  				arr.push({uri:img.path});
  			});
  			this.setState({
	            images: arr,
	         });
  		}).catch(response=>{
  			console.log(response);
  		});
  	}

  	//裁剪
  	mutiCrop() {
  		var self = this;
  		CropPicker.openPicker({
  			 multiple: false ,
  			 includeBase64: false,
  			 cropping: true ,
  			 width: 300,
  			 height: 250,
  			 cropperCircleOverlay: true,
  		}).then(image=>{
  			// console.log(image);
  			var arr = [{uri:image.path}];
  			self.setState({
	            cropImages: arr,
	         });
  		}).catch(response=>{
  			console.log(response);
  		});
  	}

  	openCamera() {
  		var self = this;
  		CropPicker.openCamera({  
		  width: 300,  
		  height: 400,  
		  cropping: true  
		}).then(image => {  
		  	var arr = [{uri:image.path}];
  			self.setState({
	            cropImages: arr,
	        });
		}).catch(response=>{
  			console.log(response);
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

      	<Text style={styles.titleStyle}>照片（多选）</Text>
      	<View>
      		{this.state.images.length > 0 ? (
      			<View style={styles.mutiShowSectionStyle}>
      			{this.state.images.map((item,index)=>{
      				return (
      					<View key={index} style={styles.itemImage}>
      						<TouchableOpacity onPress={() => this.choosePhoto('mutiple_pick')}>
      						<Image style={styles.imgStyle} resizeMode='cover' source={item} />
      						</TouchableOpacity>
                		</View>
      				);
      			})}
      			</View>
      		):(
      			<View style={styles.mutiSectionStyle}>
      			<TouchableOpacity onPress={() => this.choosePhoto('mutiple_pick')}>
      				<View style={styles.imageContainer}>
      					<View style={styles.imageContainer}><Icon name='add' size={40} color={'green'}/>
	      				<Text style={styles.textStyle}>相册/多选</Text></View>
                	</View>
            	</TouchableOpacity>
            	</View>
      		)}
      	</View>

      	<Text style={styles.titleStyle}>照片（裁剪）</Text>
      	<View>
      		{this.state.cropImages.length > 0 ? (
      			<View style={styles.mutiShowSectionStyle}>
      			{this.state.cropImages.map((item,index)=>{
      				return (
      					<View key={index} style={styles.itemImage}>
      						<TouchableOpacity onPress={() => this.choosePhoto('mutiple_crop')}>
      						<Image style={styles.imgStyle} resizeMode='contain' source={item} />
      						</TouchableOpacity>
                		</View>
      				);
      			})}
      			</View>
      		):(
      			<View style={styles.mutiSectionStyle}>
      			<TouchableOpacity onPress={() => this.choosePhoto('pick_crop')}>
      				<View style={styles.imageContainer}>
      					<View style={styles.imageContainer}><Icon name='add' size={40} color={'green'}/>
	      				<Text style={styles.textStyle}>裁剪圆形</Text></View>
                	</View>
            	</TouchableOpacity>
            	<TouchableOpacity onPress={() => this.choosePhoto('take_crop')}>
      				<View style={[styles.imageContainer,{marginLeft:10}]}>
      					<View style={styles.imageContainer}><Icon name='add' size={40} color={'green'}/>
	      				<Text style={styles.textStyle}>拍照裁剪</Text></View>
                	</View>
            	</TouchableOpacity>
            	</View>
      		)}
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
		flexWrap: 'wrap',
		marginBottom: 10,
	},
	mutiShowSectionStyle: {
		flexDirection:'row',
		justifyContent: 'flex-start',
		marginTop: 15,
		flexWrap: 'wrap',
		marginBottom: 10,
	},
	mutiSectionStyle: {
		flexDirection:'row',
		justifyContent: 'flex-start',
		marginTop: 15,
		marginLeft: 10,
		marginBottom: 10,
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
	},
	itemImage: {
		height: itemWidth ,
		width: itemWidth ,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
		marginLeft: 10,
		marginTop: 10,
	},
});


export default PhotoAndVideoSelct;