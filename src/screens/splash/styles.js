import React, { StyleSheet, Dimensions } from "react-native";
import GOBALCOLORS from '../../gobalconstant/colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default StyleSheet.create({
    mainContainer: {
        backgroundColor: GOBALCOLORS.COLORS.DARK_BLUE,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: GOBALCOLORS.COLORS.GREEN_1,
        fontSize: 40,
        fontWeight: 'bold',
    },
    text1: {
        color: GOBALCOLORS.COLORS.ORANAGE,
        fontSize: 40,
        fontWeight: 'bold',
    },
    logoImg: {
        height: width / 2,
        width: width / 2,
    },
})