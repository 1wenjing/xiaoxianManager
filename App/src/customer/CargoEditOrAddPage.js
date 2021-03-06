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
    TouchableWithoutFeedback,
    StyleSheet, BackHandler
} from "react-native";
import styleRes from '../config/StyleRes'
import Util from '../utils/Utils'
import DatabaseManager from '../utils/DatabaseManager'
import DateTimePicker from 'react-native-modal-datetime-picker'

let dateMap = new Map();
dateMap.set('Jan', '01');
dateMap.set('Feb', '02');
dateMap.set('Mar', '03');
dateMap.set('Apr', '04');
dateMap.set('May', '05');
dateMap.set('Jun', '06');
dateMap.set('Jul', '07');
dateMap.set('Aug', '08');
dateMap.set('Sep', '09');
dateMap.set('Oct', '10');
dateMap.set('Nov', '11');
dateMap.set('Dec', '12');

/**
 * 商品的新建和编辑页面
 */
export default class CargoEditOrAddPage extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            cargoName: '',
            cargoPrice: 0,
            dealTime: 0,
            customerReason: '',
            isCreate: true,
            isDateTimePickerVisible: false
        })
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: (
                <View style={{width: '100%', alignItems: 'center'}}>
                    <Text style={{color: '#ffffff', fontSize: 20}}>
                        {navigation.state.params.isCreate ? '新建商品' : '编辑商品'}
                    </Text>
                </View>),
            headerStyle: {
                backgroundColor: colorRes.themeRed
            },
            headerLeft: (
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert('商品信息尚未保存,是否退出', null,
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
        let params = this.props.navigation.state.params;
        if (params) {
            if (params.isCreate) {
                //新建商品
                this.setState({
                    isCreate: true
                })
            } else {
                //编辑商品
                this.setState({
                    isCreate: false,
                    cargoName: params.cargoName,
                    cargoPrice: params.cargoPrice,
                    dealTime: params.dealTime,
                    customerReason: params.customerReason,
                })
            }
        }
        this.props.navigation.setParams({
            isCreate: this.state.isCreate
        })
    }

    getRegisterDate = (date) => {
        if (Util.isEmpty(date) || date === 0) {
            return ''
        } else {
            let registerDate = new Date(date);
            return `${registerDate.getFullYear()}-${registerDate.getMonth() + 1}-${registerDate.getDate()}`;
        }
    };

    extracted = (date) => {
        let registerDate = date.toString().split(' ');
        let month = dateMap.get(registerDate[1])
        let day = registerDate[2];
        let year = registerDate[3];

        let dateStr = `${year}-${month}-${day}`;
        console.log(dateStr)
        let time = new Date(dateStr).getTime();
        console.log(time)
        this.setState({
            isDateTimePickerVisible: false,
            dealTime: time
        })
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

                {/*商品名称*/}
                <View style={Style.item_bg}>
                    <Text style={Style.item_key}>商品名称:</Text>
                    {
                        Platform.OS === 'ios'
                            ? <TextInput
                                onEndEditing={
                                    (evt) => {
                                        this.setState({
                                            cargoName: evt.nativeEvent.text
                                        })
                                    }
                                }
                                value={this.state.cargoName}
                                style={Style.item_input}>
                            </TextInput>
                            : <TextInput
                                underlineColorAndroid="transparent"
                                onChangeText={
                                    (text) => {
                                        this.setState({
                                            cargoName: text
                                        })
                                    }
                                }
                                value={this.state.cargoName}
                                style={Style.item_input}>
                            </TextInput>
                    }

                </View>
                <View style={Style.item_line}/>

                {/*商品价格*/}
                <View style={Style.item_bg}>
                    <Text style={Style.item_key}>商品价格:</Text>
                    <TextInput
                        value={this.state.cargoPrice}
                        onChangeText={
                            (text) => {
                                this.setState({
                                    cargoPrice: text
                                })
                            }
                        }
                        underlineColorAndroid="transparent"
                        style={Style.item_input}>

                    </TextInput>
                </View>
                <View style={Style.item_line}/>

                <View style={Style.item_line}/>

                {/*成交时间*/}
                <TouchableWithoutFeedback
                    onPress={
                        () => this.setState({isDateTimePickerVisible: true})
                    }
                >
                    <View style={Style.item_bg}>
                        <Text style={Style.item_key}>成交时间:</Text>
                        <Text style={{
                            fontSize: 14,
                            color: colorRes.fontPlaceholder,
                        }}>
                            {this.getRegisterDate(this.state.dealTime)}
                        </Text>


                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={(date) => {
                                this.extracted(date);
                            }}
                            mode={'date'}
                            cancelTextIOS={'取消'}
                            confirmTextIOS={'确认'}
                            onCancel={() => this.setState({isDateTimePickerVisible: false})}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <View style={Style.item_line}/>

                {/*购买原因*/}
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
                                placeholder='购买原因'
                                underlineColorAndroid="transparent"
                                onEndEditing={
                                    (evt) => {
                                        this.setState({
                                            customerReason: evt.nativeEvent.text
                                        })
                                    }
                                }
                                value={this.state.customerReason}
                                style={Style.item_input}>

                            </TextInput>
                            : <TextInput
                                placeholder='购买原因'
                                underlineColorAndroid="transparent"
                                onChangeText={
                                    (evt) => {
                                        this.setState({
                                            customerReason: evt
                                        })
                                    }
                                }
                                value={this.state.customerReason}
                                style={Style.item_input}>

                            </TextInput>
                    }
                </View>


                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <TouchableOpacity
                        style={[styleRes.button_bg_red, {alignSelf: 'stretch'}]}

                        onPress={() => {
                            let data = {
                                customerReason: this.state.customerReason,
                                dealTime: parseInt(this.state.dealTime),
                                cargoPrice: this.state.cargoPrice,
                                cargoName: this.state.cargoName,
                            };
                            DatabaseManager.createCargoForCustomer(this.props.navigation.state.params.customerId, data)
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