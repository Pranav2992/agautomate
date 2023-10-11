import React, {StyleSheet, Dimensions} from 'react-native';
import GOBALCOLORS from '../../gobalconstant/colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: GOBALCOLORS.COLORS.WHITE,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: GOBALCOLORS.COLORS.BLUE,
  },
  inputContainer: {
    borderRadius: 10,
    borderColor: GOBALCOLORS.COLORS.BLUE,
    borderWidth: 1,
    height: 61,
    width: width / 1.3,
    overflow: 'hidden',
    borderWidth: 0,
    marginTop: 10,
  },
  //   input: {
  //     borderRadius: 0,
  //     borderTopLeftRadius: 0,
  //     borderTopRightRadius: 0,
  //     height: 61,
  //     overflow: 'hidden',
  //     backgroundColor: '#fff',
  //   },
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
    width: width / 1.3,
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
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width / 1.3,
    marginTop: 10,
  },
  optionsText: {
    color: GOBALCOLORS.COLORS.DARK_BLUE,
    fontSize: 18,
    fontWeight: '500',
  },
  logoContainer: {
    height: 100,
    // width: 200,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  logoImg: {
    height: 100,
    width: 200,
  },
  signUpLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    textAlign: 'center',
    color: 'grey',
    // textShadowColor: 'rgba(0, 0, 0, 0.35)',
    // textShadowOffset: {width: -1, height: 1},
    // textShadowRadius: 10,
  },
});
