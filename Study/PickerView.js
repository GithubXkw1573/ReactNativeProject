import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, Image, View,PickerIOS, Picker, ScrollView,DatePickerIOS} from 'react-native';

var MODELS = {
    lan:{
        name:'lan',
        models:['汉语','英语','法语','日语','拉丁语','俄语']
    },
    games:{
        name:'games',
        models:['大表哥','尼尔机械纪元','古惑狼','乐高','三国无双']
    },
    name:{
        name:'name',
        models:['李雷','韩梅梅','蜡笔小新','白展堂','哆啦A梦']
    }
}

export default class PickerView extends Component {
    static navigationOptions = {
        title:'Picker'
    }
    constructor(props){
        super(props)
        this.state = {
            language:'Java',
            languageIndex:0,
            language2:'Java',
            languageIndex2:0,
            language3:'',
            languageIndex3:0,
            firstL:'lan',
            secondL:'汉语',
            chosenDate: new Date(),
        }   
        this.setDate = this.setDate.bind(this)
        console.log(MODELS)
    }
    setDate(newDate) {
        this.setState({chosenDate:newDate})
    }
    render(){
        valueChanged = (value,index) => {
            this.state.secondL = MODELS[value].models[0]
            this.setState({
                firstL:value,
                secondL:this.state.secondL
            })

        }
        return (
            <ScrollView style = {styles.background}>
                <Text style={styles.text1}>简单的Picker   {this.state.language + this.state.languageIndex}</Text>
                <Picker
                selectedValue={this.state.language}
                onValueChange={ (lang,index) => this.setState({language:lang,languageIndex:index})}
                >
                    <Picker.Item label="Java" value="java"></Picker.Item>
                    <Picker.Item label="JaveScript" value="js"></Picker.Item>
                </Picker>
                <Text style={styles.text1}>iOS自带Picker,静态   {this.state.language2 + this.state.languageIndex2}</Text>
                <PickerIOS
                itemStyle={{fontSize:30,color:'red',height:200,lineHeight:200}}
                selectedValue={this.state.language2}
                onValueChange={ (lang,index) => this.setState({language2:lang,languageIndex2:index})}
                >
                    <PickerIOS.Item label="Java" value="java"></PickerIOS.Item>
                    <PickerIOS.Item label="JaveScript" value="js"></PickerIOS.Item>
                </PickerIOS>
                <Text style={styles.text1}>iOS自带Picker,传入数组   {this.state.language3 + this.state.languageIndex3}</Text>
                <PickerIOS
                itemStyle={styles.itemStyle}
                selectedValue={this.state.language3}
                onValueChange={ (lang,index) => this.setState({language3:lang,languageIndex3:index})}
                >
                    {/* 这里map遍历的是models数组 */}
                    {MODELS['games'].models.map((modelName,modelIndex) => (
                        <PickerIOS
                        key={'Model_'+modelIndex}
                        value={modelName}
                        label={modelName}
                        ></PickerIOS>
                    ))}
                </PickerIOS>
                <Text style={styles.text1}>iOS多级联动 {this.state.firstL + this.state.secondL}</Text>
                <View style={{flex:1,flexDirection:"row"}}>
                    <PickerIOS
                    style={{flex:1}}
                    itemStyle={styles.itemStyle}
                    selectedValue={this.state.firstL}
                    onValueChange={valueChanged}
                    >
                        {Object.keys(MODELS).map((key,modelIdx) => (
                            <Picker.Item key={'model_'+modelIdx} label={MODELS[key].name} value={MODELS[key].name}></Picker.Item>
                        ))}
                    </PickerIOS>
                    <PickerIOS
                    style={{flex:1}}
                    itemStyle={styles.itemStyle}
                    selectedValue={this.state.secondL}
                    onValueChange={ (lang) => this.setState({secondL:lang})}
                    >
                        {MODELS[this.state.firstL].models.map((modelName,modelIdx) => (
                          <Picker.Item key={'model_'+modelIdx} label={modelName} value={modelName}></Picker.Item>
                        ))}
                    </PickerIOS>
                </View>
                <Text style={styles.text1}>iOS时间选择器 {this.state.chosenDate.toDateString()}</Text>
                <DatePickerIOS
                    date = {this.state.chosenDate}
                    onDateChange={this.setDate}
                    minimumDate={new Date()}
                    minuteInterval={1}
                    mode={'datetime'}
                    locale='zh-CN'
                />
        </ScrollView>
        )
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
    itemStyle:{
        fontSize:26,
        color:'red',
        height:300,
        lineHeight:200,
    }

});

