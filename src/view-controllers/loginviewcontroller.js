import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LoginViewModel from '../view-models/loginViewModal';
import { useSelector, useDispatch } from 'react-redux';
import { Toast } from 'native-base';
import { SHOW_PROGRESS } from '../store/types';

const LoginViewController = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(true);
    const navigation = useNavigation();
    const { userLogin } = LoginViewModel();

    const LoginUser = async (requestJson) => {
        dispatch({ type: SHOW_PROGRESS, isProgressShow: true });
        // console.log("LoginUser requestJson----->", requestJson)
        let apiResponse = await userLogin(requestJson);
        console.log("apiResponse login controller------------------------------------------------------>", apiResponse)
        // console.log("400 reponce--->", apiResponse.response.status)
        if (apiResponse.status !== undefined && apiResponse.status === 200) {
            Toast.show({
                variant: "solid",
                text: 'User login successfully.',
                type: 'success',
                duration: 6000
            });
            console.log('lastponit------------------------------------------------------------------------------------------');
            navigation.navigate("HomeScreen");
            await dispatch({ type: SHOW_PROGRESS, isProgressShow: false });


        }
        else if (apiResponse.status !== undefined && apiResponse.status === 400) {
            console.log("apiResponse.response.data--", apiResponse.response)
            Toast.show({
                variant: "solid",
                text: typeof apiResponse.response.data.non_field_errors === 'undefined' ? apiResponse.response.data[0] : apiResponse.response.data.non_field_errors[0],
                type: 'danger',
                duration: 6000
            })
        }
        else {
            Toast.show({
                variant: "solid",
                text: 'Something went wrong,Please Try again!',
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