import React, {Component} from 'react'
import colorRes from "../config/ColorRes";
import dimenRes from "../config/DimenRes";
import {
    Alert,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet, BackHandler
} from "react-native";
import styleRes from '../config/StyleRes'
import DatabaseManager from '../utils/DatabaseManager'


export default class CreateCustomerPage extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            name: '',
            age: 0,
            phone: '',
            job: '',
            address: '',
            skinDesc: ''
        })
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: (
                <View style={{width: '100%', alignItems: 'center'}}>
                    <Text style={{color: '#ffffff', fontSize: 20}}>
                        新建用户
                    </Text>
                </View>),
            headerStyle: {
                backgroundColor: colorRes.themeRed
            },
            headerLeft: (
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert('用户信息尚未保存,是否退出', null,
                            [
                                {text: "取消"},
                                {
                                    text: "退出", onPress: () => {
                                        navigation.goBack()
                                    }
                                },
                            ]);
                    }}
                >
                    <Text style={{color: '#ffffff', fontSize: 16, marginLeft: 8}}>
                        取消
                    </Text>
                </TouchableOpacity>
            ),
            headerRight: (
                <Text style={{color: colorRes.themeRed, fontSize: 16, marginLeft: 8}}>
                    取消
                </Text>
            ),
            gesturesEnabled: false
        }
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.showExitAlert);
    }

    showExitAlert = () => {
        Alert.alert('用户信息尚未保存,是否退出', null,
            [
                {text: "取消"},
                {
                    text: "退出", onPress: () => {
                        this.props.navigation.goBack()
                    }
                },
            ]);
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.showExitAlert);
    }

    render() {
        return (
            <View style={{backgroundColor: colorRes.grayBackgroud, width: '100%', height: '100%'}}>
                <Text style={{
                    color: colorRes.fontGray,
                    fontSize: 12,
                    marginTop: 20,
                    marginBottom: 8,
                    marginLeft: dimenRes.pageBorder
                }}>请根据情况完善以下资料</Text>

                {/*姓名*/}
                <View style={Style.item_bg}>
                    <Text style={Style.item_key}>姓名:</Text>
                    {
                        Platform.OS === 'ios'
                            ? <TextInput
                                onEndEditing={
                                    (evt) => {
                                        this.setState({
                                            name: evt.nativeEvent.text
                                        })
                                    }
                                }
                                value={this.state.name}
                                style={Style.item_input}>
                            </TextInput>
                            : <TextInput
                                underlineColorAndroid="transparent"
                                onChangeText={
                                    (text) => {
                                        this.setState({
                                            name: text
                                        })
                                    }
                                }
                                value={this.state.name}
                                style={Style.item_input}>
                            </TextInput>
                    }

                </View>
                <View style={Style.item_line}/>

                {/*年龄*/}
                <View style={Style.item_bg}>
                    <Text style={Style.item_key}>年龄:</Text>
                    <TextInput
                        value={this.state.age}
                        onChangeText={
                            (text) => {
                                this.setState({
                                    age: text
                                })
                            }
                        }
                        underlineColorAndroid="transparent"
                        style={Style.item_input}>

                    </TextInput>
                </View>
                <View style={Style.item_line}/>

                {/*联系方式*/}
                <View style={Style.item_bg}>
                    <Text style={Style.item_key}>联系方式:</Text>
                    <TextInput
                        value={this.state.phone}
                        underlineColorAndroid="transparent"
                        onChangeText={
                            (text) => {
                                this.setState({
                                    phone: text
                                })
                            }
                        }
                        style={Style.item_input}>

                    </TextInput>
                </View>
                <View style={Style.item_line}/>

                {/*工作*/}
                <View style={Style.item_bg}>
                    <Text style={Style.item_key}>工作:</Text>
                    {
                        Platform.OS === 'ios' ?
                            <TextInput
                                underlineColorAndroid="transparent"
                                onEndEditing={
                                    (evt) => {
                                        this.setState({
                                            job: evt.nativeEvent.text
                                        })
                                    }
                                }
                                value={this.state.job}
                                style={Style.item_input}>

                            </TextInput>
                            : <TextInput
                                underlineColorAndroid="transparent"
                                onChangeText={
                                    (evt) => {
                                        this.setState({
                                            job: evt
                                        })
                                    }
                                }
                                value={this.state.job}
                                style={Style.item_input}>

                            </TextInput>
                    }
                </View>
                <View style={Style.item_line}/>

                {/*地址*/}
                <View style={Style.item_bg}>
                    <Text style={Style.item_key}>地址:</Text>
                    {(
                        Platform.OS === 'ios' ?
                            <TextInput
                                onEndEditing={
                                    (evt) => {
                                        this.setState({
                                            address: evt.nativeEvent.text
                                        })
                                    }
                                }
                                style={Style.item_input}
                                underlineColorAndroid="transparent"
                                value={this.state.address}
                            >
                            </TextInput> : <TextInput
                                onChangeText={
                                    (evt) => {
                                        this.setState({
                                            address: evt
                                        })
                                    }
                                }
                                style={Style.item_input}
                                underlineColorAndroid="transparent"
                                value={this.state.address}
                            >
                            </TextInput>
                    )
                    }
                </View>
                <View style={Style.item_line}/>

                {/*肤质描述*/}
                <View style={{
                    backgroundColor: 'white',
                    paddingLeft: dimenRes.pageBorder,
                    paddingRight: dimenRes.pageBorder,
                    height: 200,
                    marginTop: 10,
                    padding: 10,
                    alignItems: 'flex-start',
                    flexDirection: 'row'
                }}>
                    {

                        Platform.OS === 'ios' ?
                            <TextInput
                                placeholder='肤质描述'
                                underlineColorAndroid="transparent"
                                onEndEditing={
                                    (evt) => {
                                        this.setState({
                                            skinDesc: evt.nativeEvent.text
                                        })
                                    }
                                }
                                value={this.state.skinDesc}
                                style={Style.item_input}>

                            </TextInput>
                            : <TextInput
                                placeholder='肤质描述'
                                underlineColorAndroid="transparent"
                                onChangeText={
                                    (evt) => {
                                        this.setState({
                                            skinDesc: evt
                                        })
                                    }
                                }
                                value={this.state.skinDesc}
                                style={Style.item_input}>

                            </TextInput>
                    }
                </View>


                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <TouchableOpacity
                        style={[styleRes.button_bg_red, {alignSelf: 'stretch'}]}

                        onPress={() => {
                            let data = {
                                name: this.state.name,
                                age: parseInt(this.state.age),
                                job: this.state.job,
                                phone: this.state.phone,
                                address: this.state.address,
                                skinDesc: this.state.skinDesc,
                            }
                            DatabaseManager.createCustomer(data)
                            this.props.navigation.goBack()
                        }}
                    >
                        <Text style={{color: 'white', fontSize: 16}}>保存</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

}


const Style = StyleSheet.create({
    item_bg: {
        backgroundColor: 'white',
        paddingLeft: dimenRes.pageBorder,
        paddingRight: dimenRes.pageBorder,
        height: dimenRes.itemHeight,
        alignItems: 'center',
        flexDirection: 'row'
    },
    item_key: {
        color: colorRes.fontBlack,
        fontSize: 14,
        width: 70
    },
    item_input: {
        fontSize: 14,
        flex: 1,
        color: colorRes.fontPlaceholder,
        padding: 0
    },
    item_line: {
        height: 1,
        width: dimenRes.pageBorder,
        backgroundColor: 'white'
    }
});