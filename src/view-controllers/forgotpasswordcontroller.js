import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import ForgotPasswordViewModel from '../view-models/forgotPasswordViewModal';
import { Toast } from 'native-base';


const ForgotPasswordViewController = () => {
    const navigation = useNavigation();
    const { forgotPassword } = ForgotPasswordViewModel();

    const forgotPasswordController = (requestJson) => {
        let apiResponse = forgotPassword(requestJson);
        console.log("apiResponse--------->", apiResponse)
        if (apiResponse) {
            Toast.show({
                variant: "solid",
                text: 'Password send successfully.',
                type: 'success',
                duration: 6000
            });
            // navigation.navigate("DashboardScreen");
        }
        else {
            console.log("else calll...")
            Toast.show({
                variant: "solid",
                text: 'Something went wrong. Please try again !.',
                type: 'danger',
                duration: 6000
            })
        }
    }

    return {
        forgotPasswordController
    }
}

export default ForgotPasswordViewController;