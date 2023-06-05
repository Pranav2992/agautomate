import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'native-base';
import { useDispatch } from 'react-redux';
import DashboardViewModel from '../view-models/dashboardviewmodel';
import { SHOW_PROGRESS } from '../store/types';

const DashboardController = () => {
    const dispatch = useDispatch();
    const [accessToken, setAccessToken] = useState('');
    const [userId, setUserId] = useState('');
    const { sendCoordinates } = DashboardViewModel();

    const sendCoordinatesToServer = async (requestJson) => {
        dispatch({ type: SHOW_PROGRESS, isProgressShow: true });
        let apiResponse = await sendCoordinates(requestJson);
        if (apiResponse === true) {
            Toast.show({
                variant: "solid",
                text: 'Send Coordinates successfully.',
                type: 'success',
                duration: 6000
            });
        }
        else {
            Toast.show({
                variant: "solid",
                text: 'Something went wrong. Please try again !.',
                type: 'danger',
                duration: 6000
            })
        }
    }

    return {
        accessToken,
        userId,
        setAccessToken,
        setUserId,
        sendCoordinatesToServer
    }
}

export default DashboardController;