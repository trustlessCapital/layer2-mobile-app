import React, {Component} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, ScrollView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StatusBarColor from '../components/status-bar-color';
import Colors from '../constants/Colors';
import styles from '../stylesheets/deposit-home';
import ConfirmDialog from '../components/confirm-dialog';
import LoadingIndicator from '../components/loading-indicator';
import ErrorDialog from '../components/error-dialog';
import WalletService from '../services/wallet-service';
import StorageUtils from '../services/storage-utils';
import apiServices from '../services/api-services';
import walletUtils from '../services/wallet-utils';

export default class DepositEthBalanceScreen extends Component {
  state = {
    ethBalance: [],
    isLoading: true,
    confirmDialog: false,
    confirmDialogTitle: 'Cancel Deposit Funds',
    confirmDialogMessage: 'Are you sure you want to cancel the deposit funds transaction?',
  }

  constructor(props) {
    super(props);
    if (this.props.route && this.props.route.params) {
      if (this.props.route.params.accountDetails)
        this.accountDetails = this.props.route.params.accountDetails;
      if (this.props.route.params.pk) this.pk = this.props.route.params.pk;
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    let promises = [this.fetchEtheriumBalance(), this.getExchangeRates()];
    this.state.isLoading = true;
    Promise.all(promises).then(() => {
      this.setState({isLoading: false});
    }).catch((e) => {
      console.log("ERROR >>> ", e)
      // Show toast in case of any error
      this.setState({isLoading: false});
    })
  }

  getExchangeRates = async () => {
    this.exchangeRates = await StorageUtils.exchangeRates();
  }

  fetchEtheriumBalance = async () => {
    const address = await WalletService.getInstance().getEtheriumAddress();
    await apiServices.getEtheriumBalance(address).then(ethBalance => {
      this.state.ethBalance = ethBalance;
    });
  }

  navigateBack = () => { this.props.navigation.goBack(); }

  goToDepositFromEthScreen = (token) => {
    this.props.navigation.push('DepositEthScreen', {
      accountDetails: this.accountDetails,
      pk: this.pk,
      token,
    });
  }

  goToDashboard = () => {
    this.props.navigation.popToTop();
    this.props.navigation.replace('DashboardScreen', {
      pk: this.pk,
      accountDetails: this.accountDetails,
    });
  }

  cancelTx = () => {
    this.setState({ confirmDialog: true });
  }

  get titleBar() {
    return (
      <>
        <View style={styles.titleBar}>
          <View style={styles.titleBarContentLeft}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={this.navigateBack}>
              <Icon
                name={'ios-arrow-back'}
                size={24}
                color={Colors.white}
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBarContent}>
            <Text style={styles.titleBarTitle}>Deposit Funds</Text>
          </View>
          <View style={styles.titleBarContentRight} />
        </View>
      </>
    );
  }

  get depositContent() {
    return (
      <>
        <View style={styles.card}>
          <Text style={styles.title}>
            Choose from your balances in Etherium Main Network
          </Text>
          <View style={styles.cardContent}>
            {this.state.ethBalance.map(
              (balanceObj, index) =>
                balanceObj.value != 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      this.goToDepositFromEthScreen(balanceObj.symbol);
                    }}
                    style={[styles.buttonStyle, styles.marginButtom]}>
                    <Text style={[styles.buttonText3, styles.marginLeft]}>
                      {balanceObj.symbol.toUpperCase()}
                    </Text>
                    <View style={[styles.rowFlex, styles.marginRight]}>
                      <View
                        style={[
                          styles.columnFlex,
                          styles.marginLeft,
                          styles.centerAlign,
                        ]}>
                        <Text style={[styles.buttonText3]}>
                          {walletUtils.getAssetDisplayText(
                            balanceObj.symbol,
                            balanceObj.value,
                          )}
                        </Text>
                        <Text
                          style={[styles.buttonText2, styles.greenText]}>
                          $
                          {walletUtils.getAssetDisplayTextInUSD(
                            balanceObj.symbol,
                            walletUtils.getAssetDisplayText(
                              balanceObj.symbol,
                              balanceObj.value,
                            ),
                            this.exchangeRates,
                          )}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ),
            )}
          </View>
        </View>
      </>
    );
  }

  get mainContent() {
    return (
      <>
        <View style={styles.mainContent}>
          
        </View>
      </>
    );
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.wrapper}>
          <StatusBarColor
            backgroundColor={Colors.primary_bg}
            barStyle="light-content"
          />
          <KeyboardAvoidingView style={{flex: 1}}>
            <View style={styles.container}>
              {this.titleBar}
              <ScrollView style={styles.mainContentWrapper}>
                {this.depositContent}
              </ScrollView>
              <View style={styles.cardFooter}>
                <TouchableOpacity
                  onPress={this.cancelTx.bind(this)}
                  style={[styles.buttonStylePrimary]}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
              <ConfirmDialog
                title={this.state.confirmDialogTitle}
                visible={this.state.confirmDialog}
                message={this.state.confirmDialogMessage}
                onDismiss={() => {
                  this.setState({confirmDialog: false});
                }}
                onOk={() => {
                  this.goToDashboard();
                  this.setState({confirmDialog: false});
                }}
              />
              <LoadingIndicator
                visible={this.state.isLoading}
              />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    );
  }
}