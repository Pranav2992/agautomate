import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import SignUpViewModel from '../view-models/signupviewmodel';

const SignUpViewController = () => {
    const navigation = useNavigation();
    const { userRegisteration } = SignUpViewModel();

    const registerUser = (requestJson) => {
        userRegisteration(requestJson);
    }

    return {
        registerUser
    }

}

export default SignUpViewController;