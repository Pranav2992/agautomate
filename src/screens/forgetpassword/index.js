import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  BackHandler,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './styles';
import {TextInput} from 'react-native-paper';
import GOBALCOLOR from '../../gobalconstant/colors';
import ForgotPasswordViewController from '../../view-controllers/forgotpasswordcontroller';
import ProgressScreen from '../highordercomponents/progressscreen';
const ForgetPasswordScreen = props => {
  const {forgotPasswordController} = ForgotPasswordViewController();
  const [email, setEmail] = useState('');

  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/AgAutomate.png')}
          style={styles.logoImg}
        />
      </View>
      <Text style={styles.signUpLabel}>Forgot Password</Text>
      <View style={[styles.inputContainer, {marginTop: 20}]}>
        <TextInput
          mode="outlined"
          label="Email"
          placeholder="Email"
          style={styles.input}
          value={email}
          keyboardType="email-address"
          onChangeText={text => {
            setEmail(text);
          }}
          activeUnderlineColor={GOBALCOLOR.COLORS.ORANAGE}
          underlineColor={GOBALCOLOR.COLORS.ORANAGE}
          outlineStyle={{borderWidth: 0.5}}
        />
      </View>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() =>
          forgotPasswordController({
            email: email,
          })
        }>
        <Text style={styles.buttonText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('SignInScreen')}>
        <Text style={{color: 'skyblue', fontSize: 16, margin: 30}}>
          Back to login
        </Text>
      </TouchableOpacity>
      <ProgressScreen />
    </View>
  );
};

export default ForgetPasswordScreen;
