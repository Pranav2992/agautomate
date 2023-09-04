import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, BackHandler, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import styles from "./styles";
import { TextInput } from 'react-native-paper';
import GOBALCOLOR from '../../gobalconstant/colors';
import { connect } from "react-redux";
import LoginViewController from "../../view-controllers/loginviewcontroller";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validationSchema, validationSchemaRecover, validationSchemaUpdatePassword } from './formValidation';
import * as Yup from 'yup';
import ProgressScreen from '../highordercomponents/progressscreen';

const SignInScreen = (props) => {

  const { LoginUser, showPassword, setShowPassword } = LoginViewController();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Formik
      initialValues={{
        email: '', password: ''
      }}
      validationSchema={validationSchema}
      onSubmit={LoginUser}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Sign In</Text>
          <View style={[styles.inputContainer, { marginTop: 50 }]}>
            <TextInput
              mode="flat"
              label="Email"
              error={true}
              style={styles.input}
              value={values.email}
              keyboardType="email-address"
              // onChangeText={(text) => {
              //   setEmail(text);
              // }}
              max={100}
              onChangeText={
                handleChange('email')
              }
              onBlur={handleBlur('email')}
              activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
              underlineColor={GOBALCOLOR.COLORS.BROWN}
            />
          </View>
          <View style={styles.errorMessageContainer}>
            {errors.email &&
              touched.email ? (
              <Text style={styles.ErrorMessage}>
                {errors.email + ' *'}
              </Text>
            ) : null}
          </View>
          <View style={[styles.inputContainer, { marginTop: 20 }]}>
            <TextInput
              mode="flat"
              label="Password"
              secureTextEntry={showPassword}
              style={styles.input}
              value={values.password}
              keyboardType="default"
              // onChangeText={(text) => {
              //   setPassword(text);
              // }}
              onChangeText={
                handleChange('password')
              }
              onBlur={handleBlur('password')}
              right={<TextInput.Icon icon="eye" forceTextInputFocus={false} iconColor={GOBALCOLOR.COLORS.BROWN} style={{ marginTop: 10 }} onPress={() => setShowPassword(!showPassword)} />}
              activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
              underlineColor={GOBALCOLOR.COLORS.BROWN}
            />
          </View>
          <View style={styles.errorMessageContainer}>
            {errors.password &&
              touched.password ? (
              <Text style={styles.ErrorMessage}>
                {errors.password + ' *'}
              </Text>
            ) : null}
          </View>
          <TouchableOpacity style={styles.buttonStyle}
            disabled={!isValid || !values.email || !values.password}
            onPress={
              () => LoginUser({
                "email": values.email,
                "password": values.password,
              })
              // LoginUser
            }
          >
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
          <ProgressScreen />
        </View>
      )}
    </Formik>
  )
};

export default connect(null, null)(SignInScreen);
