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
        let apiResponse = await userLogin(requestJson);
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
        LoginUser,
        showPassword,
        setShowPassword
    }
}

export default LoginViewController;