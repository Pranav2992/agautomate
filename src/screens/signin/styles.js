import React, { StyleSheet, Dimensions } from 'react-native';
import GOBALCOLORS from '../../gobalconstant/colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: GOBALCOLORS.COLORS.WHITE,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: GOBALCOLORS.COLORS.BLUE,
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
  // input: {
  //     borderRadius: 0,
  //     borderTopLeftRadius: 0,
  //     borderTopRightRadius: 0,
  //     height: 55,
  //     //overflow: 'hidden',
  //     backgroundColor: GOBALCOLORS.COLORS.BROWN_LIGHT,
  // },
  input: {
    marginBottom: 16,
    color: 'black',
    backgroundColor: 'white',
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
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width / 1.1,
    marginTop: 10,
  },
  optionsText: {
    color: GOBALCOLORS.COLORS.DARK_BLUE,
    fontSize: 18,
    fontWeight: '500',
  },
  ErrorMessage: {
    top: 10,
    color: 'red',
  },
  errorMessageContainer: {
    alignItems: 'center',
  },
  spinnerTextStyle: {
    width: 250,
    textAlign: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
  logoContainer: {
    height: 100,
    // width: 200,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 20,

  },
  logoImg: {
    height: width / 2,
    width: width / 2,
  },
  signUpLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    textAlign: 'center',
    color: 'grey',
    marginBottom: 30,
    // textShadowColor: 'rgba(0, 0, 0, 0.35)',
    // textShadowOffset: {width: -1, height: 1},
    // textShadowRadius: 10,
  },
  link: {
    color: 'skyblue',
  },
  linkLabel: {
    marginTop: 20,
    marginBottom: 40,
    color: 'black',
    textAlign: 'center',
  },
  fpContainer: {
    alignItems: 'flex-end',
    width: '100%',
    marginRight: 30,
  },
  fpLabel: {
    color: 'skyblue',
    fontSize: 14,
  },
  dhaContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  dhaLabel: {
    fontSize: 16,
    color: '#333333',
  },
  suLabel: {
    color: 'skyblue',
    fontSize: 16,
  },
});
