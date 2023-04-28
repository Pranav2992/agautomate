import React, { StyleSheet } from "react-native";
import GOBALCOLORS from '../../gobalconstant/colors';

export default StyleSheet.create({
    mainContainer: {
        backgroundColor: GOBALCOLORS.COLORS.DARK_BLUE,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: GOBALCOLORS.COLORS.GREEN_1,
        fontSize: 50,
        fontWeight: 'bold',
    },
    text1: {
        color: GOBALCOLORS.COLORS.ORANAGE,
        fontSize: 50,
        fontWeight: 'bold',
    }
})