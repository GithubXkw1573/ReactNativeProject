import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	TextInput,
	Text,
	Alert
} from 'react-native';

export default class TextInputDemo extends Component {
	static navigationOptions = {
		title: 'TextInput',
	};
	
	constructor(props) {
		super(props);
		this.state = {
			iptStr :'input'
		}
	}
 	
	render() {
		return (
			<View style={styles.container}>
				<TextInput style={styles.input}
					placeholder={this.state.iptStr}
					onChangeText={(iptStr) => this.setState({iptStr})}
					// onFocus={()=>{alert('获得焦点')}}
					onBlur={()=>{alert('失去焦点')}}
					// maxLength={100}
					// multiline={true} //multiline 和 password这两个属性不能共存
					password={true}
					placeholderTextColor='blue'
					// autoFocus={true}
					clearButtonMode="while-editing"
					clearTextOnFocus={true}
				>
				</TextInput>
				<Text style={styles.text}>{this.state.iptStr}</Text>
			</View>
		);
	}

}
const styles = StyleSheet.create({
	container: {
		backgroundColor:'gray',
		paddingHorizontal:15 ,
		paddingVertical:10,
	},
	input: {
		height: 30,
		backgroundColor:'red',
		width:100,
	},
	text: {
		backgroundColor:'white',
		fontSize:40,
		padding:10,
		marginTop:10,
	}
});