import React, { StyleSheet } from "react-native";
import GOBALCOLORS from '../../gobalconstant/colors'
export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black'
  },
  appBarContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GOBALCOLORS.COLORS.BLUE,
    justifyContent: 'space-between',
  },
  appBarTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: GOBALCOLORS.COLORS.WHITE,
  },

})