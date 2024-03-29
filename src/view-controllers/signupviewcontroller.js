import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import SignUpViewModel from '../view-models/signupviewmodel';
import { Snackbar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { Toast } from 'native-base';
import { SHOW_PROGRESS } from '../store/types';

const SignUpViewController = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(true);
    const [showCnfPassword, setCnfShowPassword] = useState(true);
    //  const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [cnfPassword, setCnfPassword] = useState('');
    const [firmType, setFirmType] = useState('individual');
    const navigation = useNavigation();

    const { userRegisteration } = SignUpViewModel();

    const goBackScreen = () => {
        navigation.goBack();
    }

    const registerUser = async (requestJson) => {
        dispatch({ type: SHOW_PROGRESS, isProgressShow: true });
        console.log("requestJson----->", JSON.stringify(requestJson))
        let apiResponse = await userRegisteration(requestJson);
        console.log("registerUser apiResponse---->", apiResponse)
        console.log("registerUser apiResponse message---->", apiResponse.status)
        if (apiResponse.status !== undefined && apiResponse.status === 200) {
            Toast.show({
                variant: "solid",
                text: 'User register successfully.',
                type: 'success',
                duration: 6000
            });
            navigation.navigate('VerifyOtpScreen', { email: requestJson.email });
        }
        else if (apiResponse.response.status !== undefined && apiResponse.response.status === 400) {
            Toast.show({
                variant: "solid",
                text: typeof apiResponse.response.data.non_field_errors === 'undefined' ? apiResponse.response.data[0] : apiResponse.response.data.non_field_errors[0],
                type: 'danger',
                duration: 6000
            })
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
        showCnfPassword,
        setCnfShowPassword,
        goBackScreen,
        // userName,
        //  setUserName,
        firstName, setFirstName,
        lastName, setLastName,
        email, setEmail,
        password, setPassword,
        mobileNumber, setMobileNumber,
        cnfPassword, setCnfPassword,
    }

}

export default SignUpViewController;