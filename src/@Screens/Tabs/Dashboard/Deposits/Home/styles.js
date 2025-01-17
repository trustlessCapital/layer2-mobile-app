import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../../../../../@Constants/Colors';
  
export default (styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.primaryBg,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.primaryBg,
        padding:moderateScale(20)
    },
    backButtonWrapper: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
    },
    titleBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
        marginBottom: 40,
    },
    titleBarContentLeft: {
        flex: 1,
        alignItems: 'flex-start',
        width: 30,
    },
    backButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleBarContent: {
        flex: 2,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    titleBarContentRight: {
        flex: 1,
        alignItems: 'flex-end',
    },
    titleBarTitle: {
        color: Colors.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
    },
    title: {
        color: Colors.white,
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
        width: '100%',
    },
    optionStyle:{
        color: Colors.white,
        fontFamily: 'Montserrat-Regular',
        fontSize: moderateScale(11),
        width: '100%',
        marginTop:moderateScale(10)
    },
    titleIcon: {
        width: 100,
        height: 100
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: Colors.tintColorDark,
        width: '100%',
        borderRadius: 20,
    },
    cardContent: {
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
    },
    cardFooter: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf:'center'
    },
    buttonStylePrimary: {
        borderRadius: 5,
        width: '100%',
        backgroundColor: Colors.tintColorSecondary,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    halfButton: {
        width: '40%',
    },
    buttonText: {
        color: Colors.white,
        fontFamily: 'Montserrat-Bold',
        fontWeight: 'bold',
        fontSize: 14,
    },
    buttonText2: {
        color: Colors.tintColorGreyedDark,
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
    },
    buttonText3: {
        color: Colors.tintColorGreyedDark,
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
    },
    greenText: {
        color: Colors.green,
    },
    inputLabel: {
        color: Colors.tintColorGreyedDark,
        fontFamily: 'Montserrat-Bold',
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom: 5,
        marginLeft: 5,
        alignSelf: 'flex-start',
    },
    inputText: {
        flex: 1,
        color: Colors.white,
        fontFamily: 'Montserrat-Bold',
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 10,
    },
    buttonStyleSecondary: {
        borderRadius: 5,
        backgroundColor: Colors.tintColor,
        width: '100%',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        borderRadius: 10,
        backgroundColor: Colors.tintColorLight,
        width: '100%',
        paddingVertical: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    noBackground: {
        backgroundColor: null
    },
    marginAround: {
        margin: 20
    },
    marginButtom: {
        marginBottom: 20,
    },
    marginLeft: {
        marginLeft: 20,
    },
    marginRight: {
        marginRight: 20,
    },
    rowFlex: {
        flexDirection: 'row',
    },
    columnFlex: {
        flexDirection: 'column',
    },
    centerAlign: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainContentWrapper: {
        flex: 1,
        width: Dimensions.get('window').width - 40,
    },
    mainContent: {
        flex: 1,
    },
    borderTop: {
        borderTopColor: Colors.primaryBg,
        borderTopWidth: 1
    },
    viewBox:{
        alignItems:'center',
        marginTop:moderateScale(50),
        flex:1
    },
    walletText: {
        color: Colors.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: moderateScale(20),
    },
    transactText: {
        color: Colors.darkGrey,
        fontFamily: 'Montserrat-Bold',
        fontSize: moderateScale(16),
    },
    secondsText: {
        color: Colors.lightGrey,
        fontFamily: 'Montserrat-Regular',
        fontSize: moderateScale(11),
        alignSelf:'center',
        marginTop:moderateScale(5)
    },
    Loader:{
        width:moderateScale(150),
        height:moderateScale(150),
        marginTop:moderateScale(200)
    },
    infoText:{
        color: Colors.white,
        fontFamily: 'Montserrat-Bold',
        fontSize: moderateScale(12),
        position:'absolute',
        bottom:moderateScale(10)
    },
    feeText:{
        alignSelf:'center',
        marginTop:moderateScale(10),
        fontWeight:'bold',
        color:Colors.activeTintRed,
        fontSize:moderateScale(12),
    },
}));
  
  