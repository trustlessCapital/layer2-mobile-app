// Copyright (C) 2020  Trustless Pvt Ltd. <https://trustless.capital>

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Created By @name Sukumar_Abhijeet,
 */

import React, { useState } from 'react';
import {View,Text, TextInput,ScrollView,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import apiServices from '../../../../@Services/api-services';
import * as CurrencyActions from '../../../../@Redux/actions/currencyActions';
import { connect } from 'react-redux';
import styles from '../styles';
import Options from '../Options';
import Modal from 'react-native-modal';
import Colors from '../../../../@Constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { moderateScale } from 'react-native-size-matters';
import LoadingIndicator from '../../../../@Components/loading-indicator';

const availabeOptions = [
    {icon:'dollar-sign',name:'Display Currency',showArrow:false}
];
 
const Preferences = ({...props}) =>{

    const {
        updateExchangeRates,selectedCurrency,currencyList,
        navigation,accountDetails
    } = props;

    const value = selectedCurrency.exchange;
    const [isActive, setIsActive] = useState(false);
    const [loader, setLoader] = useState(false);

    const {recommended = [], all =[]} = currencyList;

    const getCurrency = (currency) =>{
        setIsActive(false);
        setLoader(true);
        apiServices.getCurrencyRate(currency)
            .then(data=>{
                setLoader(false);
                updateExchangeRates(data);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Auth',params:{ accountDetails: accountDetails }}],
                });
            })
            .catch(()=>{
                setLoader(false);
            });
    };

    const renderEachCurrency = (item) =>{
        return(
            <TouchableOpacity onPress={()=>getCurrency(item.shortName)} style={{paddingVertical:moderateScale(15),paddingLeft:moderateScale(20)}}>
                <Text style={styles.optionText}>{item.fullName}</Text>
            </TouchableOpacity>
        );
    };

    const renderCurrencyList = () =>{
        return(
            <View style={styles.modalWrapper}>
                <View style={styles.searchWrapper}>
                    <Icon color={Colors.lightGrey} name={'search'} style={{marginRight:moderateScale(10)}} />
                    <TextInput 
                        placeholder={'Search Your Currency'}
                        placeholderTextColor={Colors.lightGrey}
                        style={styles.searchBox}
                    />
                </View>
                <ScrollView contentContainerStyle={{padding:moderateScale(20)}} showsVerticalScrollIndicator={false}>
                    <Text style={styles.titleBar_title}>Recommended</Text>
                    {recommended.map((item)=>(
                        renderEachCurrency(item)
                    ))}
                    <Text style={styles.titleBar_title}>All</Text>
                    {all.map((item)=>(
                        renderEachCurrency(item)
                    ))}
                </ScrollView>
            </View>
        );
    };

    return(
        <View style={styles.boxWrapper}>
            <Text style={styles.titleBar_title}>Your Preferences</Text>
            {availabeOptions.map((item,index)=>(
                <Options key={index} onPress={()=>setIsActive(true)} optionItem={item} optionValue={value} />
            ))}
            <Modal
                animationIn={'slideInRight'}
                animationOut={'slideOutRight'}
                backdropColor={'#000'}
                dismissable={true}
                isVisible={isActive}
                onBackButtonPress={()=>setIsActive(false)}
                onBackdropPress={()=>setIsActive(false)}
                style={{justifyContent:'center',alignItems:'center',padding:0,margin:0}}
                useNativeDriver={true}
            >
                {renderCurrencyList()}
            </Modal>
            <LoadingIndicator
                message={'Refreshing Currency, Please wait'}
                visible={loader}
            />
        </View>
    );
};

Preferences.propTypes = {
    accountDetails:PropTypes.object.isRequired,
    currencyList:PropTypes.object.isRequired,
    navigation:PropTypes.object.isRequired,
    selectedCurrency:PropTypes.object.isRequired,
    updateExchangeRates:PropTypes.func.isRequired,
};

function mapStateToProps(state){
    return{
        selectedCurrency : state.currency.selectedCurrency,
        currencyList:state.currency.currencyList
    };
}

function mapDispatchToProps(dispatch){
    return{
        updateExchangeRates:currency =>
            dispatch(CurrencyActions.updateExchangeRates(currency)),
    };
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Preferences);