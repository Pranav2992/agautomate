import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LoginViewModel from '../view-models/loginViewModal';
import { useSelector } from 'react-redux';
import { Toast } from 'native-base';


const LoginViewController = () => {
    const [showPassword, setShowPassword] = useState(true);
    const navigation = useNavigation();
    const { userLogin } = LoginViewModel();

    const LoginUser = async (requestJson) => {
        console.log("LoginUser requestJson----->",requestJson )
        let apiResponse = await userLogin(requestJson);
        console.log("apiResponse login controller--------->", apiResponse)
        console.log("400 reponce--->", apiResponse.status)
        if (apiResponse.status !== undefined && apiResponse.status === 200) {
            Toast.show({
                variant: "solid",
                text: 'User login successfully.',
                type: 'success',
                duration: 6000
            });
            navigation.navigate("DashboardScreen");
        }
        else if (apiResponse.status === 400) {
            Toast.show({
                variant: "solid",
                text: 'User not validated!!',
                type: 'danger',
                duration: 6000
            })
        }
        else {
            Toast.show({
                variant: "solid",
                text: 'Please check your internet connection !.',
                type: 'danger',
                duration: 6000
            })
        }
    }

    return {
        LoginUser,
        showPassword,
        setShowPassword
    }
}

export default LoginViewController;