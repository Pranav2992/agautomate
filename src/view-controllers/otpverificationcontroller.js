import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'native-base';
import OTPVerificationViewModel from '../view-models/otpverficationviewmodel';

const OTPVerificationController = () => {
    const navigation = useNavigation();
    const [otp1, setOtp1] = useState('');
    const [otp2, setOtp2] = useState('');
    const [otp3, setOtp3] = useState('');
    const [otp4, setOtp4] = useState('');

    const { accountActivation } = OTPVerificationViewModel();


    const goBackScreen = () => {
        navigation.goBack();
    }

    const activationAccount = async (requestJson) => {
        let apiResponse = await accountActivation(requestJson);
        if (apiResponse === true) {
            Toast.show({
                variant: "solid",
                text: 'OTP verification successfully.',
                type: 'success',
                duration: 6000
            });
            navigation.navigate('SignInScreen');
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
        otp1,
        otp2,
        otp3,
        otp4,
        setOtp1,
        setOtp2,
        setOtp3,
        setOtp4,
        activationAccount, 
        goBackScreen
    }
}

export default OTPVerificationController;