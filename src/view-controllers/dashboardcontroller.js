import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'native-base';
import DashboardViewModel from '../view-models/dashboardviewmodel';

const DashboardController = () => {
    const [accessToken, setAccessToken] = useState('');
    const [userId, setUserId] = useState('');
    const { sendCoordinates } = DashboardViewModel();

    const sendCoordinatesToServer = async (requestJson) => {
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