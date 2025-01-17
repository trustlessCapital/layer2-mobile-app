import React, { Component } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    TextInput
} from 'react-native';
import LoadingIndicator from '../../../@Components/loading-indicator';
import {PIN_SCREEN_MODE} from '../../../@Constants';
import ErrorDialog from '../../../@Components/error-dialog';
import Colors from '../../../@Constants/Colors';
import StatusBarColor from '../../../@Components/status-bar-color';

import styles from './styles';
import APIService from '../../../@Services/api-services';
const mailImage = require('../../../../assets/images/icons/mail.png');
const smsImage = require('../../../../assets/images/icons/sms.png');

export const VERIFICATION_MODE = {
    SMS: 'sms',
    EMAIL: 'email'
};

export default class VerificationScreen extends Component {
  accountDetails = null;
  state = {
      isLoading: false,
      isOTPScreen: true,
      mode: VERIFICATION_MODE.EMAIL,
      otp: null,
      errorMessage: 'You have entered Invalid or Expired OTP!',
      errorTitle: 'Verification Failed',
      showError: false,
  };

  constructor(props) {
      super(props);
      if (this.props.route && this.props.route.params) {
          if (this.props.route.params.mode)
              this.state.mode = this.props.route.params.mode;
          if (this.props.route.params.accountDetails)
              this.accountDetails = this.props.route.params.accountDetails;
      }
    
  }

  onSelect = (country) => {
      this.setState({
          countryCode: country.cca2,
          countryCallingCode: '+' + country.callingCode[0],
          showCountryPicker: false,
      });
  };

  openCountryPicker = () => {
      this.setState({ showCountryPicker: true });
  };

  render() {
      return (
          <SafeAreaView style={styles.wrapper}>
              <StatusBarColor
                  backgroundColor={Colors.primary_bg}
                  barStyle="light-content"
              />
              <KeyboardAvoidingView style={{flex: 1}}>
                  <ScrollView contentContainerStyle={{flexGrow: 1}}>
                      <View style={styles.container}>
                          <Image
                              source={this.getHeaderImage()}
                              style={styles.titleImage}
                          />
                          <Text style={styles.title}>{this.getTitle()}</Text>
                          <Text style={styles.subTitle}>{this.getSubTitle()}</Text>
                          {this.state.mode === VERIFICATION_MODE.SMS && (
                              <TextInput
                                  keyboardType={'phone-pad'}
                                  maxLength={4}
                                  onChangeText={this.otpInput}
                                  placeholder={'- - - -'}
                                  placeholderTextColor={Colors.subTitle}
                                  style={styles.otpInput}
                                  value={this.state.otp}
                              />
                          )}
                          <TouchableOpacity
                              onPress={this.onButtonPress}
                              style={styles.button}>
                              <Text style={styles.buttonText}>
                                  {this.getButtonTitle()}
                              </Text>
                          </TouchableOpacity>
                          {this.state.mode === VERIFICATION_MODE.SMS && (
                              <TouchableOpacity onPress={this.resendOTP}>
                                  <Text style={styles.linkButton}>Resend OTP</Text>
                              </TouchableOpacity>
                          )}
                      </View>
                  </ScrollView>
              </KeyboardAvoidingView>
              <LoadingIndicator
                  message={'Please wait!'}
                  visible={this.state.isLoading}
              />
              <ErrorDialog
                  message={this.state.errorMessage}
                  onDismiss={() => {
                      this.setState({showError: false});
                  }}
                  title={this.state.errorTitle}
                  visible={this.state.showError}
              />
          </SafeAreaView>
      );
  }

  getTitle = () => {
      if (this.state.mode === VERIFICATION_MODE.SMS) {
          return 'Verify your mobile number';
      } else {
          return 'Verify your email address';
      }
  }

  getSubTitle = () => {
      if (this.state.mode === VERIFICATION_MODE.SMS) {
          return 'Please enter the OTP sent to your mobile number. OTP is valid for 10 minutes.';
      } else {
          return 'An email is sent to your registered email-id. Please click on the verification link to finish your account verification and proceed to login.';
      }
  }

  getButtonTitle = () => {
      if (this.state.mode === VERIFICATION_MODE.SMS) {
          return 'Verify';
      } else {
          return 'Login';
      }
  }

  getHeaderImage = () => {
      if (this.state.mode === VERIFICATION_MODE.SMS) {
          return smsImage;
      } else {
          return mailImage;
      }
  }

  otpInput = (otp) => {
      this.state.otp = otp;
      this.setState({ otp });
      if (otp.length == 4) {
          this.verifyOTP();
      }
  }

  onButtonPress = () => {
      if (this.state.mode === VERIFICATION_MODE.SMS) {
          this.verifyOTP();
      } else {
          this.props.navigation.replace('PINScreen', {
              mode: PIN_SCREEN_MODE.LOGIN_PIN,
          });
      }
  }

  verifyOTP = () => {
      this.setState({ isLoading: true });
      APIService.verifyOTP(this.accountDetails.email, this.accountDetails.phoneNumber, this.state.otp)
          .then(() => {
              this.setState({ isLoading: false, mode: VERIFICATION_MODE.EMAIL });
          })
          .catch((error) => {
              this.setState({
                  isLoading: false,
                  showError: true,
                  errorMessage: 'You have entered Invalid or Expired OTP!',
                  errorTitle: 'Verification Failed',
              });
          })
          .finally(() => this.setState({ isLoading: false }));
  }

   resendOTP = () => {
       this.setState({ isLoading: true });
       APIService.resendOTP(this.accountDetails.email, this.accountDetails.phoneNumber)
           .then(() => {
               this.setState({
                   isLoading: false,
                   showError: true,
                   errorMessage: 'OTP is sent to your mobile!',
                   errorTitle: 'OTP sent',
               });
           })
           .catch((error) => {
               this.setState({
                   isLoading: false,
                   showError: true,
                   errorMessage: 'Unable to send OTP now. Try again later!',
                   errorTitle: 'OTP resend failed!',
               });
           })
           .finally(() => this.setState({ isLoading: false }));
   }
}
