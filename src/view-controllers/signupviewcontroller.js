import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import SignUpViewModel from '../view-models/signupviewmodel';
import { Snackbar } from 'react-native-paper';
import { Toast } from 'native-base';

const SignUpViewController = () => {
    const navigation = useNavigation();
    const { userRegisteration } = SignUpViewModel();

    const registerUser = (requestJson) => {
        let apiResponse = userRegisteration(requestJson);
        if (apiResponse) {
            Toast.show({
                variant: "solid",
                text: 'User register successfully.',
                type: 'success',
                duration: 6000
            });
            navigation.goBack();
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
        registerUser
    }

}

export default SignUpViewController;