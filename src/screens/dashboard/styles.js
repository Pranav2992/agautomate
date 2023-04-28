import React, { StyleSheet, Dimensions } from "react-native";
import GOBALCOLORS from '../../gobalconstant/colors';

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
        justifyContent: 'space-between'
    },
    appBarTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: GOBALCOLORS.COLORS.WHITE
    },
    dropdownContainer: {
        margin: 10
    },
    mapBtn: {
        position: 'absolute',//use absolute position to show button on top of the map
        top: '90%', //for center align
        right: '5%',
        alignSelf: 'flex-end', //for align to right
        backgroundColor: GOBALCOLORS.COLORS.CHOKLETI,
        padding: 12,
        borderRadius: 10,
        shadowColor: GOBALCOLORS.COLORS.BLACK,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        elevation: 7
    },
    maBtnText: {
        color: GOBALCOLORS.COLORS.WHITE,
        fontSize: 18,
        fontWeight: 'bold'
    }
});
