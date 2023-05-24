import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LoginViewModel from '../view-models/loginViewModal';
import { Toast } from 'native-base';


const LoginViewController = () => {
    const navigation = useNavigation();
    const { userLogin } = LoginViewModel();

    const LoginUser = (requestJson) => {
        let apiResponse = userLogin(requestJson);
        console.log("apiResponse--------->", apiResponse)
        if (apiResponse === true) {
            console.log("if apiResponse--------->", apiResponse)

            Toast.show({
                variant: "solid",
                text: 'User login successfully.',
                type: 'success',
                duration: 6000
            });
            navigation.navigate("DashboardScreen");
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
        LoginUser
    }
}

export default LoginViewController;