import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import SignUpViewModel from '../view-models/signupviewmodel';
import { Snackbar } from 'react-native-paper';
import { Toast } from 'native-base';

const SignUpViewController = () => {
    const [showPassword, setShowPassword] = useState(true);
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const navigation = useNavigation();
    const { userRegisteration } = SignUpViewModel();

    const goBackScreen = () => {
        navigation.goBack();
    }

    const registerUser = async (requestJson) => {
        let apiResponse = await userRegisteration(requestJson);
        if (apiResponse === true) {
            Toast.show({
                variant: "solid",
                text: 'User register successfully.',
                type: 'success',
                duration: 6000
            });
            navigation.navigate('VerifyOtpScreen', { email: email });
        } else {
            Toast.show({
                variant: "solid",
                text: 'Something went wrong. Please try again !.',
                type: 'danger',
                duration: 6000
            })
        }
    }

    return {
        registerUser,
        showPassword,
        setShowPassword,
        goBackScreen,
        userName,
        setUserName,
        firstName, setFirstName,
        lastName, setLastName,
        email, setEmail,
        password, setPassword,
        mobileNumber, setMobileNumber
    }

}

export default SignUpViewController;