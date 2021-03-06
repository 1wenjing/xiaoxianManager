import React, {Component} from 'react'
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions,
    StyleSheet
} from 'react-native'
import DatabaseManager from '../utils/DatabaseManager'
import Util from '../utils/Utils'
import ColorRes from "../config/ColorRes";
import DashLine from "./DashLine.js";

let screenW = Dimensions.get('window').width;
export default class CustomerDetailPage extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            customerDetail: {},
            displayData: []
        })
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: '客户详情',
            headerTintColor: '#fff',
            headerRight: (
                <TouchableOpacity
                    style={{alignItems: 'center', justifyContent: 'center', marginRight: 16}}
                    onPress={
                        () => navigation.state.params && navigation.state.params.jumpToCreatCargo ? navigation.state.params.jumpToCreatCargo() : () => {
                        }}
                >
                    <Text style={{color: '#fff', fontFamily: 'PingFangSC-Regular', fontSize: 16}}>添加商品</Text>
                </TouchableOpacity>
            )
        }
    };

    componentWillMount() {

        this.props.navigation.setParams({
            jumpToCreatCargo: this.jumpToCreatCargo
        })
        DatabaseManager.addDataChangeListener(this.fetchData)
    }

    componentWillUnmount() {
        DatabaseManager.removeDataChangeListener(this.fetchData)
    }

    componentDidMount() {
        this.setState({
            customerDetail: this.props.navigation.state.params.customerDetail,
        });
        this.fetchData();
    }

    fetchData = () => {
        let displayData = [];
        let result = DatabaseManager.queryCargoForCustomer(this.props.navigation.state.params.customerDetail.customerId).sorted('dealTime', true);
        for (let i = 0; i < result.length; i++) {
            let item = {
                cargoName: result[i].cargoName,
                cargoPrice: result[i].cargoPrice,
                dealTime: result[i].dealTime,
                customerReason: result[i].customerReason,
            }
            displayData.push(item)
        }
        this.setState({
            displayData: Util.clone(displayData)
        })
    }

    /**
     * 跳转添加商品
     */
    jumpToCreatCargo = () => {
        this.props.navigation.navigate({
            routeName: 'CARGO_ADD_EDIT',
            key: 'customer-edit-cargo',
            params: {
                isCreate: true,
                customerId: this.state.customerDetail.customerId
            }
        })
    };

    renderItem = (item, index) => {
        return (
            <View style={styles.list_content}>
                <View style={styles.list_content_titleView}>
                    <Text
                        style={styles.list_content_carName}> {item.cargoName}</Text>

                    <TouchableOpacity style={styles.list_content_detailTouch}
                                      onPress={() => {

                                      }}
                    >
                        <Text style={styles.list_content_detail_text}>编辑</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.list_content_access_stateView}>
                    <Text
                        style={styles.list_content_assessNumber}>{item.cargoPrice + '元'}</Text>
                </View>
                <View style={styles.list_content_access_infoView}>
                    <Text style={styles.list_content_rowTitle}>购买时间:</Text>
                    <Text style={styles.list_content_rowText}>{Util.formatDate(item.dealTime)}</Text>
                </View>
                <View style={[styles.list_content_access_infoView, {marginBottom: 10}]}>
                    <Text style={styles.list_content_rowTitle}>购买原因:</Text>
                    <Text
                        style={styles.list_content_rowText}>{item.customerReason}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{width: '100%', height: '100%'}}>
                <View style={styles.list_content}>
                    <View style={styles.list_content_titleView}>
                        <Text
                            style={styles.list_content_carName}> {this.state.customerDetail.name}</Text>

                        <TouchableOpacity style={styles.list_content_detailTouch}
                                          onPress={() => {

                                          }}
                        >
                            <Text style={styles.list_content_detail_text}>编辑</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.list_content_access_stateView}>
                        <Text
                            style={styles.list_content_assessNumber}>{this.state.customerDetail.phone}</Text>
                        <View style={styles.list_content_assessPartingLine}/>
                        <Text
                            style={styles.list_content_assessStatus}>年龄：{this.state.customerDetail.age}</Text>
                    </View>
                    <DashLine backgroundColor={'#b0b0b0'} len={50} width={screenW - 30}/>
                    <View style={styles.list_content_access_infoView}>
                        <Text style={styles.list_content_rowTitle}>工作:</Text>
                        <Text style={styles.list_content_rowText}>{this.state.customerDetail.job}</Text>
                    </View>
                    <View style={styles.list_content_access_infoView}>
                        <Text style={styles.list_content_rowTitle}>住址:</Text>
                        <Text style={styles.list_content_rowText}>{this.state.customerDetail.address}</Text>
                    </View>
                    <View style={[styles.list_content_access_infoView]}>
                        <Text style={styles.list_content_rowTitle}>肤质描述:</Text>
                        <Text style={styles.list_content_rowText}>{this.state.customerDetail.skinDesc}</Text>
                    </View>
                    <View style={[styles.list_content_access_infoView, {marginBottom: 10}]}>
                        <Text style={styles.list_content_rowTitle}>上次操作时间:</Text>
                        <Text
                            style={styles.list_content_rowText}>{Util.formatDate(this.state.customerDetail.lastCousumeTime)}</Text>
                    </View>
                </View>

                <FlatList
                    style={{marginTop: 10}}
                    renderItem={({item, index}) => this.renderItem(item, index)}
                    data={this.state.displayData}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list_content: {
        width: '100%',
        backgroundColor: '#fff',
        marginTop: 10
    },
    list_content_titleView: {
        width: '100%',
        height: 24,
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    list_content_access_stateView: {
        width: '100%',
        marginTop: 8,
        alignItems: 'center',
        flexDirection: 'row'
    },
    list_content_access_infoView: {
        width: '100%',
        marginTop: 12,
        alignItems: 'center',
        flexDirection: 'row'
    },

    list_content_carName: {
        marginLeft: 16,
        fontFamily: 'PingFangSC-Medium',
        fontSize: 18,
        color: '#111',
        flex: 1
    },
    list_content_detailTouch: {
        marginRight: 20,
        width: 56,
        height: 24,
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: '#DD433B',
        alignItems: 'center',
        justifyContent: 'center'
    },
    list_content_detail_text: {
        fontFamily: 'PingFangSC-Regular',
        fontSize: 12,
        color: ColorRes.themeRed

    },
    list_content_assessNumber: {
        marginLeft: 15,
        fontFamily: 'PingFangSC-Regular',
        fontSize: 12
    },
    list_content_assessPartingLine: {
        marginLeft: 8,
        alignSelf: 'center',
        width: 2,
        height: 8,
        backgroundColor: '#444'
    },
    list_content_assessStatus: {
        marginLeft: 8,
        fontFamily: 'PingFangSC-Regular',
        fontSize: 12
    },
    list_content_rowTitle: {
        marginLeft: 15,
        fontFamily: 'PingFangSC-Regular',
        fontSize: 14,
        color: '#777'
    },
    list_content_rowText: {
        marginLeft: 8,
        fontFamily: 'PingFangSC-Regular',
        fontSize: 14,
        color: '#111'
    }
});