import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, BackHandler, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { TextInput } from 'react-native-paper';
import GOBALCOLOR from '../../gobalconstant/colors';
import LoginViewController from "../../view-controllers/loginviewcontroller";

const SignInScreen = (props) => {

  const { LoginUser } = LoginViewController();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Sign In</Text>
      <View style={[styles.inputContainer, { marginTop: 50 }]}>
        <TextInput
          mode="flat"
          label="Email"
          style={styles.input}
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => {
            setEmail(text);
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
          value={password}
          keyboardType="default"
          onChangeText={(text) => {
            setPassword(text);
          }}
          activeUnderlineColor={GOBALCOLOR.COLORS.ORANAGE}
          underlineColor={GOBALCOLOR.COLORS.ORANAGE}
        />
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => LoginUser({
        "email": email,
        "password": password,
      })} >
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
    </View>
  )
};

export default SignInScreen;
