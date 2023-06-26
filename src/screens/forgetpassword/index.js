import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, BackHandler, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { TextInput } from 'react-native-paper';
import GOBALCOLOR from '../../gobalconstant/colors';
import ForgotPasswordViewController from "../../view-controllers/forgotpasswordcontroller";
import ProgressScreen from '../highordercomponents/progressscreen';
const ForgetPasswordScreen = (props) => {
  const { forgotPasswordController } = ForgotPasswordViewController();
  const [email, setEmail] = useState('');

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Forgot Password</Text>
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
      <TouchableOpacity style={styles.buttonStyle} onPress={() => forgotPasswordController({
        "email": email,
      })} >
        <Text style={styles.buttonText}>Forgot Password?</Text>
      </TouchableOpacity>
      <ProgressScreen />
    </View>
  )
};

export default ForgetPasswordScreen;
