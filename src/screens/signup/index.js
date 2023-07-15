import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, BackHandler, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { TextInput, RadioButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GOBALCOLOR from '../../gobalconstant/colors';
import SignUpViewController from "../../view-controllers/signupviewcontroller";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import validationSchema from './formValidation';
import ProgressScreen from '../highordercomponents/progressscreen';
import { value } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";
const SignUpScreen = (props) => {

  const {
    registerUser,
    setShowPassword,
    showPassword,
    showCnfPassword,
    setCnfShowPassword,
    goBackScreen,
    email, firstName, lastName, mobileNumber, password, cnfPassword, firmType,
    setEmail, setFirstName, setLastName, setMobileNumber, setPassword, setCnfPassword, setFirmType,
  } = SignUpViewController();
  const [checked, setChecked] = React.useState('individual');
  console.log("checked====>", checked)
  return (
    <KeyboardAwareScrollView style={styles.mainContainer}>
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
            firmType: '',
            firmName: '',
            firmRegisterNumber: '',
            firmBranchName: '',
            firmOfficeAddress: '',
            firmPhoneNumber: '',
            firmEmialId: '',
            firstName: '',
            lastName: '',
            email: '',
            mobileNumber: '',
            password: '',
            cnfPassword: '',
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

              <View style={{ flexDirection: 'row', alignContent: 'center', marginLeft: 15 }}>
                <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Text style={{ color: "green", fontWeight: "bold", fontSize: 16 }}>Firm Type:</Text>
                </View>
                <RadioButton
                  value="individual"
                  status={checked === 'individual' ? 'checked' : 'unchecked'}
                  onPress={() =>
                    setChecked('individual')
                  }
                />
                <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Text style={{ color: "#000" }}>Individual</Text>
                </View>
                <RadioButton
                  value="company"
                  status={checked === 'company' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('company')}
                />
                <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Text style={{ color: "#000" }}>Company</Text>
                </View>
              </View>
              {checked === "company" && <View>
                <View style={{ alignSelf: "flex-start", marginLeft: 10 }}>
                  <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>Firm Details:</Text>
                </View>
                <View style={[styles.inputContainer, { marginTop: 10 }]}>
                  <TextInput
                    mode="flat"
                    label="Firm Name"
                    style={styles.input}
                    value={values.firmName}
                    keyboardType="default"
                    // onChangeText={(text) => {
                    //   setFirstName(text);
                    // }}
                    onChangeText={handleChange('firmName')}
                    onBlur={handleBlur('firmName')}
                    activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                    underlineColor={GOBALCOLOR.COLORS.BROWN}
                  />
                </View>
                {errors.firmName && touched.firmName ? (
                  <Text style={styles.ErrorMessage}>
                    {errors.firmName + ' *'}
                  </Text>
                ) : null}
                <View style={[styles.inputContainer, { marginTop: 10 }]}>
                  <TextInput
                    mode="flat"
                    label="Firm Register Number"
                    style={styles.input}
                    value={values.firmRegisterNumber}
                    keyboardType="default"
                    // onChangeText={(text) => {
                    //   setFirstName(text);
                    // }}
                    onChangeText={handleChange('firmRegisterNumber')}
                    onBlur={handleBlur('firmRegisterNumber')}
                    activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                    underlineColor={GOBALCOLOR.COLORS.BROWN}
                  />
                </View>
                {errors.firmRegisterNumber && touched.firmRegisterNumber ? (
                  <Text style={styles.ErrorMessage}>
                    {errors.firmRegisterNumber + ' *'}
                  </Text>
                ) : null}
                <View style={[styles.inputContainer, { marginTop: 10 }]}>
                  <TextInput
                    mode="flat"
                    label="Firm Branch Number"
                    style={styles.input}
                    value={values.firmBranchName}
                    keyboardType="default"
                    // onChangeText={(text) => {
                    //   setFirstName(text);
                    // }}
                    onChangeText={handleChange('firmBranchName')}
                    onBlur={handleBlur('firmBranchName')}
                    activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                    underlineColor={GOBALCOLOR.COLORS.BROWN}
                  />
                </View>
                {errors.firmBranchName && touched.firmBranchName ? (
                  <Text style={styles.ErrorMessage}>
                    {errors.firmBranchName + ' *'}
                  </Text>
                ) : null}
                <View style={[styles.inputContainer, { marginTop: 10 }]}>
                  <TextInput
                    mode="flat"
                    label="Firm Office Address"
                    style={styles.input}
                    value={values.firmOfficeAddress}
                    keyboardType="default"
                    // onChangeText={(text) => {
                    //   setFirstName(text);
                    // }}
                    onChangeText={handleChange('firmOfficeAddress')}
                    onBlur={handleBlur('firmOfficeAddress')}
                    activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                    underlineColor={GOBALCOLOR.COLORS.BROWN}
                  />
                </View>
                {errors.firmfirmOfficeAddressBranchName && touched.firmOfficeAddress ? (
                  <Text style={styles.ErrorMessage}>
                    {errors.firmOfficeAddress + ' *'}
                  </Text>
                ) : null}
                <View style={[styles.inputContainer, { marginTop: 10 }]}>
                  <TextInput
                    mode="flat"
                    label="Firm Phone Number"
                    style={styles.input}
                    value={values.firmPhoneNumber}
                    keyboardType="default"
                    // onChangeText={(text) => {
                    //   setFirstName(text);
                    // }}
                    onChangeText={handleChange('firmPhoneNumber')}
                    onBlur={handleBlur('firmPhoneNumber')}
                    activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                    underlineColor={GOBALCOLOR.COLORS.BROWN}
                  />
                </View>
                {errors.firmPhoneNumber && touched.firmPhoneNumber ? (
                  <Text style={styles.ErrorMessage}>
                    {errors.firmPhoneNumber + ' *'}
                  </Text>
                ) : null}
                <View style={[styles.inputContainer, { marginTop: 10 }]}>
                  <TextInput
                    mode="flat"
                    label="Firm Email ID"
                    style={styles.input}
                    value={values.firmEmialId}
                    keyboardType="default"
                    // onChangeText={(text) => {
                    //   setFirstName(text);
                    // }}
                    onChangeText={handleChange('firmEmialId')}
                    onBlur={handleBlur('firmEmialId')}
                    activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                    underlineColor={GOBALCOLOR.COLORS.BROWN}
                  />
                </View>
                {errors.firmEmialId && touched.firmEmialId ? (
                  <Text style={styles.ErrorMessage}>
                    {errors.firmEmialId + ' *'}
                  </Text>
                ) : null}
              </View>}
              <View style={{ alignSelf: "flex-start", marginLeft: 10, marginTop: 10 }}>
                <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16 }}>Personal Details:</Text>
              </View>
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
              <View>
                {errors.firstName && touched.firstName ? (
                  <Text style={styles.ErrorMessage}>
                    {errors.firstName + ' *'}
                  </Text>
                ) : null}
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
              <View>
                {errors.lastName && touched.lastName ? (
                  <Text style={styles.ErrorMessage}>
                    {errors.lastName + ' *'}
                  </Text>
                ) : null}
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
              <View>
                {errors.email && touched.email ? (
                  <Text style={styles.ErrorMessage}>
                    {errors.email + ' *'}
                  </Text>
                ) : null}
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
                {errors.mobileNumber && touched.mobileNumber ? (
                  <Text style={styles.ErrorMessage}>
                    {errors.mobileNumber + ' *'}
                  </Text>
                ) : null}
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
              <View>
                {errors.password && touched.password ? (
                  <Text style={styles.ErrorMessage}>
                    {errors.password + ' *'}
                  </Text>
                ) : null}
              </View>
              <View style={[styles.inputContainer, { marginTop: 10 }]}>
                <TextInput
                  mode="flat"
                  label="Confirm Password"
                  secureTextEntry={values.showPassword}
                  style={styles.input}
                  value={values.cnfPassword}
                  keyboardType="default"
                  // onChangeText={(text) => {
                  //   setPassword(text);
                  // }}
                  onChangeText={handleChange('cnfPassword')}
                  onBlur={handleBlur('cnfPassword')}
                  right={<TextInput.Icon icon="eye" iconColor={GOBALCOLOR.COLORS.BROWN} style={{ marginTop: 10 }} onPress={() => setCnfShowPassword(!showCnfPassword)} />}
                  activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                  underlineColor={GOBALCOLOR.COLORS.BROWN}
                />
              </View>
              <View>
                {errors.cnfPassword && touched.cnfPassword ? (
                  <Text style={styles.ErrorMessage}>
                    {errors.cnfPassword + ' *'}
                  </Text>
                ) : null}
              </View>
              <TouchableOpacity style={styles.buttonStyle}
                disabled={!isValid || !values.firstName || !values.lastName || !values.email || !values.password}
                onPress={() => registerUser({
                  // "FirmType": values.firmType,
                  // "FirmRegisterNumber": values.firmRegisterNumber,
                  // "FirmBranchName": values.firmBranchName,
                  // "FirmOfficeAddress": values.firmOfficeAddress,
                  // "FirmPhoneNumber": values.firmPhoneNumber,
                  // "FirmEmialId": values.firmEmialId,
                  "FirstName": values.firstName,
                  "LastName": values.lastName,
                  "email": values.email,
                  "MobileNo": values.mobileNumber,
                  "password": values.password,
                  "cnfPassword": values.cnfPassword,
                })} >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <ProgressScreen />
      </View >
    </KeyboardAwareScrollView >
  )
};

export default SignUpScreen;
