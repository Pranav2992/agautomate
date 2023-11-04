import React, { StyleSheet, Dimensions } from 'react-native';
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
    /* justifyContent: 'space-between' */
  },
  appBarTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: GOBALCOLORS.COLORS.WHITE,
  },
  inputContainer: {
    borderRadius: 7,
    borderColor: GOBALCOLORS.COLORS.BLUE,
    borderWidth: 1,
    height: 60,
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
    elevation: 7,
  },
  buttonText: {
    color: GOBALCOLORS.COLORS.WHITE,
    fontSize: 18,
    fontWeight: '400',
  },
  dropdownContainer: {
    margin: 10,
  },
  inputDropdown: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: 55,
    borderColor: GOBALCOLORS.COLORS.BROWN,
    backgroundColor: GOBALCOLORS.COLORS.BROWN_LIGHT,
  },
  boxStyle: {
    borderWidth: 0,
    width: width / 3,
    height: 55,
    flexDirection: 'row',
  },
  rbBtn: {
    flexDirection: 'row',
  },
  spinnerTextStyle: {
    width: 250,
    textAlign: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
  container: {
    backgroundColor: 'white',
    paddingVertical: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 8,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: 'black'
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black'

  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black'
  },
  
});
