import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, BackHandler, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GOBALCOLOR from '../../gobalconstant/colors';
import SignUpViewController from "../../view-controllers/signupviewcontroller";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import validationSchema from './formValidation';

const SignUpScreen = (props) => {

  const {
    registerUser,
    setShowPassword,
    showPassword,
    goBackScreen,
    // userName,
    email, firstName, lastName, mobileNumber, password,
    setEmail, setFirstName, setLastName, setMobileNumber, setPassword,
    //setUserName
  } = SignUpViewController();

  return (
    <KeyboardAwareScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.appBarContainer}>
          <View style={{ flexDirection: 'row', position: 'absolute', left: 5 }}>
            <Ionicons name="arrow-back" size={35} style={{ margin: 10, color: '#FFF' }} onPress={() => goBackScreen()} />
          </View>
          <View style={{ marginLeft: 70 }}>
            <Text style={styles.appBarTitle}>Sign Up</Text>
          </View>
        </View>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            mobileNumber: '',
          }}
          validationSchema={validationSchema}
          onSubmit={registerUser}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
              {/* <View style={[styles.inputContainer, { marginTop: 10 }]}>
                <TextInput
                  mode="flat"
                  label="User Name"
                  style={styles.input}
                  value={values.userName}
                  keyboardType="default"
                  // onChangeText={(text) => {
                  //   setUserName(text);
                  // }}
                  onChangeText={handleChange('userName')}
                  onBlur={handleBlur('userName')}
                  activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                  underlineColor={GOBALCOLOR.COLORS.BROWN}
                />
              </View> */}
              <View style={[styles.inputContainer, { marginTop: 10 }]}>
                <TextInput
                  mode="flat"
                  label="First Name"
                  style={styles.input}
                  value={values.firstName}
                  keyboardType="default"
                  // onChangeText={(text) => {
                  //   setFirstName(text);
                  // }}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                  underlineColor={GOBALCOLOR.COLORS.BROWN}
                />
              </View>
              <View style={[styles.inputContainer, { marginTop: 10 }]}>
                <TextInput
                  mode="flat"
                  label="Last Name"
                  style={styles.input}
                  value={values.lastName}
                  keyboardType="default"
                  // onChangeText={(text) => {
                  //   setLastName(text);
                  // }}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                  underlineColor={GOBALCOLOR.COLORS.BROWN}
                />
              </View>
              <View style={[styles.inputContainer, { marginTop: 10 }]}>
                <TextInput
                  mode="flat"
                  label="Email"
                  style={styles.input}
                  value={values.email}
                  keyboardType="email-address"
                  // onChangeText={(text) => {
                  //   setEmail(text);
                  // }}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                  underlineColor={GOBALCOLOR.COLORS.BROWN}
                />
              </View>
              <View style={[styles.inputContainer, { marginTop: 10 }]}>
                <TextInput
                  mode="flat"
                  label="Password"
                  secureTextEntry={values.showPassword}
                  style={styles.input}
                  value={values.password}
                  keyboardType="default"
                  // onChangeText={(text) => {
                  //   setPassword(text);
                  // }}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
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
                  value={values.mobileNumber}
                  keyboardType="phone-pad"
                  // onChangeText={(text) => {
                  //   setMobileNumber(text);
                  // }}
                  onChangeText={handleChange('mobileNumber')}
                  onBlur={handleBlur('mobileNumber')}
                  activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                  underlineColor={GOBALCOLOR.COLORS.BROWN}
                />
              </View>
              <View>
                {errors.firstName && touched.firstName ? (
                  <Text style={styles.ErrorMessage}>
                    {errors.firstName + ' *'}
                  </Text>
                ) : null}
                {errors.lastName && touched.lastName ? (
                  <Text style={styles.ErrorMessage}>
                    {errors.lastName + ' *'}
                  </Text>
                ) : null}
                {errors.email && touched.email ? (
                  <Text style={styles.ErrorMessage}>
                    {errors.email + ' *'}
                  </Text>
                ) : null}
                {errors.password && touched.password ? (
                  <Text style={styles.ErrorMessage}>
                    {errors.password + ' *'}
                  </Text>
                ) : null}
                {errors.mobileNumber && touched.mobileNumber ? (
                  <Text style={styles.ErrorMessage}>
                    {errors.mobileNumber + ' *'}
                  </Text>
                ) : null}
              </View>
              <TouchableOpacity style={styles.buttonStyle}
                disabled={!isValid || !values.firstName || !values.lastName || !values.email || !values.password}
                onPress={() => registerUser({
                  "FirstName": values.firstName,
                  "LastName": values.lastName,
                  "email": values.email,
                  "password": values.password,
                  "MobileNo": values.mobileNumber
                })} >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View >
    </KeyboardAwareScrollView>
  )
};

export default SignUpScreen;
