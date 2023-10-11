import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  BackHandler,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import styles from './styles';
import {TextInput} from 'react-native-paper';
import GOBALCOLOR from '../../gobalconstant/colors';
import {connect, useSelector} from 'react-redux';
import LoginViewController from '../../view-controllers/loginviewcontroller';
import {Formik} from 'formik';
import {validationSchema} from './formValidation';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = props => {
  navigation=useNavigation()
  const {LoginUser, showPassword, setShowPassword} = LoginViewController();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isShowModal, isProgressShow} = useSelector(state => state.appReducers);
  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        Alert.alert("Hold on!", "Are you sure you want to exit app?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
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
          <Spinner
            //visibility of Overlay Loading Spinner
            visible={isProgressShow}
            //Text with the Spinner
            textContent={'Waiting for response from the server...'}
            //Text style of the Spinner Text
            textStyle={styles.spinnerTextStyle}
            overlayColor="rgba(0, 0, 0, 0.5)"
            animation="fade"
            size="large"
            customIndicator={
              <Image
                source={require('../../assets/agautomate_logo.png')}
                style={styles.image}
                resizeMode="center"
              />
            }></Spinner>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/AgAutomate.png')}
              style={styles.logoImg}
            />
          </View>
          <Text style={styles.signUpLabel}>Sign In</Text>
          <View style={[styles.inputContainer]}>
            <TextInput
              mode="outlined"
              label="Email"
              style={styles.input}
              value={values.email}
              keyboardType="email-address"
              // onChangeText={(text) => {
              //   setEmail(text);
              // }}
              max={100}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
              underlineColor={GOBALCOLOR.COLORS.BROWN}
              outlineStyle={{borderWidth: 0.5}}
              activeOutlineColor={
                errors.email && touched.email ? 'red' : 'black'
              }
            />
          </View>
          <View style={styles.errorMessageContainer}>
            {errors.email && touched.email ? (
              <Text style={styles.ErrorMessage}>{errors.email + ' *'}</Text>
            ) : null}
          </View>
          <View style={[styles.inputContainer, {marginTop: 20}]}>
            <TextInput
              mode="outlined" 
              label="Password"
              secureTextEntry={showPassword}
              style={styles.input}
              value={values.password}
              keyboardType="default"
              // onChangeText={(text) => {
              //   setPassword(text);
              // }}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  forceTextInputFocus={false}
                  iconColor={GOBALCOLOR.COLORS.BROWN}
                  style={{marginTop: 10}}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
              underlineColor={GOBALCOLOR.COLORS.BROWN}
              outlineStyle={{borderWidth: 0.5}}
              activeOutlineColor={
                errors.password && touched.password ? 'red' : 'black'
              }
            />
          </View>
          <View style={styles.errorMessageContainer}>
            {errors.password && touched.password ? (
              <Text style={styles.ErrorMessage}>{errors.password + ' *'}</Text>
            ) : null}
          </View>
          <View style={styles.fpContainer}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('ForgetPasswordScreen')}>
              <Text style={styles.fpLabel}>forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.buttonStyle}
            disabled={!isValid || !values.email || !values.password}
            onPress={
              () =>
                LoginUser({
                  email: values.email,
                  password: values.password,
                })
              // LoginUser
            }>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          {/* <View style={styles.optionsContainer}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SignUpScreen')}>
              <Text style={styles.optionsText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('ForgetPasswordScreen')}>
              <Text style={styles.optionsText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.dhaContainer}>
            <Text style={styles.dhaLabel}>Don`t have an account?</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SignUpScreen')}>
              <Text style={styles.suLabel}>Create account</Text>
            </TouchableOpacity>
          </View>
          {/* <ProgressScreen /> */}
        </View>
      )}
    </Formik>
  );
};

export default connect(null, null)(SignInScreen);
