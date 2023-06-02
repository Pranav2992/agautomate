import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, BackHandler, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GOBALCOLOR from '../../gobalconstant/colors';
import SignUpViewController from "../../view-controllers/signupviewcontroller";

const SignUpScreen = (props) => {

  const {
    registerUser,
    setShowPassword,
    showPassword,
    goBackScreen,
    userName,
    email, firstName, lastName, mobileNumber, password,
    setEmail, setFirstName, setLastName, setMobileNumber, setPassword, setUserName
  } = SignUpViewController();



  return (
    <View style={styles.mainContainer}>
      <View style={styles.appBarContainer}>
        <View style={{ flexDirection: 'row', position: 'absolute', left: 5 }}>
          <Ionicons name="arrow-back" size={35} style={{ margin: 10, color: '#FFF' }} onPress={() => goBackScreen()} />
        </View>
        <View style={{ marginLeft: 70 }}>
          <Text style={styles.appBarTitle}>Sign Up</Text>
        </View>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
        <View style={[styles.inputContainer, { marginTop: 10 }]}>
          <TextInput
            mode="flat"
            label="User Name"
            style={styles.input}
            value={userName}
            keyboardType="default"
            onChangeText={(text) => {
              setUserName(text);
            }}
            activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
            underlineColor={GOBALCOLOR.COLORS.BROWN}
          />
        </View>
        <View style={[styles.inputContainer, { marginTop: 10 }]}>
          <TextInput
            mode="flat"
            label="First Name"
            style={styles.input}
            value={firstName}
            keyboardType="default"
            onChangeText={(text) => {
              setFirstName(text);
            }}
            activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
            underlineColor={GOBALCOLOR.COLORS.BROWN}
          />
        </View>
        <View style={[styles.inputContainer, { marginTop: 10 }]}>
          <TextInput
            mode="flat"
            label="Last Name"
            style={styles.input}
            value={lastName}
            keyboardType="default"
            onChangeText={(text) => {
              setLastName(text);
            }}
            activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
            underlineColor={GOBALCOLOR.COLORS.BROWN}
          />
        </View>
        <View style={[styles.inputContainer, { marginTop: 10 }]}>
          <TextInput
            mode="flat"
            label="Email"
            style={styles.input}
            value={email}
            keyboardType="email-address"
            onChangeText={(text) => {
              setEmail(text);
            }}
            activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
            underlineColor={GOBALCOLOR.COLORS.BROWN}
          />
        </View>
        <View style={[styles.inputContainer, { marginTop: 10 }]}>
          <TextInput
            mode="flat"
            label="Password"
            secureTextEntry={showPassword}
            style={styles.input}
            value={password}
            keyboardType="default"
            onChangeText={(text) => {
              setPassword(text);
            }}
            right={<TextInput.Icon icon="eye" iconColor={GOBALCOLOR.COLORS.BROWN} style={{ marginTop: 10 }} onPress={() => setShowPassword(!showPassword)} />}
            activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
            underlineColor={GOBALCOLOR.COLORS.BROWN}
          />
        </View>
        <View style={[styles.inputContainer, { marginTop: 10 }]}>
          <TextInput
            mode="flat"
            label="Mobile Number"
            style={styles.input}
            value={mobileNumber}
            keyboardType="phone-pad"
            onChangeText={(text) => {
              setMobileNumber(text);
            }}
            activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
            underlineColor={GOBALCOLOR.COLORS.BROWN}
          />
        </View>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => registerUser({
          "UserName": userName,
          "FirstName": firstName,
          "LastName": lastName,
          "email": email,
          "password": password,
          "MobileNo": mobileNumber
        })} >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View >
  )
};

export default SignUpScreen;
