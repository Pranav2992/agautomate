import React from "react";
import { View, Text, StyleSheet, Dimensions, BackHandler, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { TextInput } from 'react-native-paper';
import GOBALCOLOR from '../../gobalconstant/colors';

const SignInScreen = (props) => {
  
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Sign In</Text>
      <View style={[styles.inputContainer, { marginTop: 50 }]}>
        <TextInput
          mode="flat"
          label="Email"
          style={styles.input}
          value={""}
          keyboardType="email-address"
          /* ref={mobileTextInput} */
          onChangeText={(text) => {

          }}
          activeUnderlineColor={GOBALCOLOR.COLORS.ORANAGE}
          underlineColor={GOBALCOLOR.COLORS.ORANAGE}
        />
      </View>
      <View style={[styles.inputContainer, { marginTop: 20 }]}>
        <TextInput
          mode="flat"
          label="Password"
          style={styles.input}
          value={""}
          keyboardType="default"
          /* ref={mobileTextInput} */
          onChangeText={(text) => {

          }}
          activeUnderlineColor={GOBALCOLOR.COLORS.ORANAGE}
          underlineColor={GOBALCOLOR.COLORS.ORANAGE}
        />
      </View>
      <TouchableOpacity onPress={() => props.navigation.navigate('DashboardScreen')} style={styles.buttonStyle} >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={() => props.navigation.navigate('SignUpScreen')}>
          <Text style={styles.optionsText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('ForgetPasswordScreen')}>
          <Text style={styles.optionsText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View >
  )
};

export default SignInScreen;
