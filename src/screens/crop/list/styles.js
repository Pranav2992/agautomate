import React, { StyleSheet, Dimensions } from "react-native";
import GOBALCOLORS from '../../../gobalconstant/colors';
import { black } from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
    mainContainer: {
        backgroundColor: GOBALCOLORS.COLORS.WHITE,
        flex: 1,
    },
    appBarContainer: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: GOBALCOLORS.COLORS.BLUE,
        /* justifyContent: 'space-between' */
    },
    appBarTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: GOBALCOLORS.COLORS.WHITE
    },
    inputContainer: {
        borderRadius: 7,
        borderColor: GOBALCOLORS.COLORS.BLUE,
        borderWidth: 1,
        height: 60,
        width: width / 1.1,
        overflow: 'hidden',
        borderWidth: 0,
        marginTop: 0,
    },
    input: {
        borderRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        height: 55,
        //overflow: 'hidden',
        backgroundColor: GOBALCOLORS.COLORS.BROWN_LIGHT,
    },
    buttonStyle: {
        backgroundColor: GOBALCOLORS.COLORS.GREEN_2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        height: 50,
        width: width / 1.1,
        borderRadius: 10,
        shadowColor: GOBALCOLORS.COLORS.GREEN_2,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        elevation: 7
    },
    buttonText: {
        color: GOBALCOLORS.COLORS.WHITE,
        fontSize: 18,
        fontWeight: '400'
    },
    ErrorMessage: {
        fontSize: 12,
        color: 'red',
        marginTop: 3,
        textAlign: 'center'
    },
    mainCardView: {
        height: 90,
        width:'90%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: GOBALCOLORS.COLORS.BLUE,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 16,
        // paddingRight: 14,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 16,
        marginRight: 16,
      },
      text:{
        color:'black'
      }
});