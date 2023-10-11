import React, {StyleSheet, Dimensions} from 'react-native';
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
    fontSize: 25,
    fontWeight: 'bold',
    color: GOBALCOLORS.COLORS.WHITE,
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
    marginBottom: 16,
    color: 'black',
    backgroundColor: 'white',
  },
  // input: {
  //   borderRadius: 0,
  //   borderTopLeftRadius: 0,
  //   borderTopRightRadius: 0,
  //   height: 55,
  //   //overflow: 'hidden',
  //   backgroundColor: GOBALCOLORS.COLORS.BROWN_LIGHT,
  // },
 
  buttonStyle: {
    backgroundColor: GOBALCOLORS.COLORS.GREEN_2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    height: 50,
    width: width / 1.1,
    borderRadius: 10,
    shadowColor: GOBALCOLORS.COLORS.GREEN_2,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    elevation: 7,
  },
  buttonText: {
    color: GOBALCOLORS.COLORS.WHITE,
    fontSize: 18,
    fontWeight: '400',
  },
  ErrorMessage: {
    fontSize: 12,
    color: 'red',
    marginTop: 3,
    textAlign: 'center',
  },
  spinnerTextStyle: {
    width: 250,
    textAlign: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
});
