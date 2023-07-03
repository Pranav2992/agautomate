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

    const checkCoordinateClockWise = (requestJson) => {
        console.log("checkCoordinateClockWise requestJson", requestJson)

        var area = 0;
        for (var i = 0; i < (requestJson.Coordinate.length); i++) {
            let j = (i + 1) % requestJson.Coordinate.length;

            area += requestJson.Coordinate[i].longitude * requestJson.Coordinate[j].latitude;
            area -= requestJson.Coordinate[j].longitude * requestJson.Coordinate[i].latitude;
            console.log("area----->", area);
        }
        console.log("checkCoordinateClockWise requestJson ParameterId", requestJson.ParameterId)
        console.log("area", area)
        if (area < 0 && requestJson.ParameterId !== null) {
            sendCoordinatesToServer(requestJson);
        }
        else if (requestJson.ParameterId === null && area < 0) {
            Toast.show({
                variant: "solid",
                text: 'Please Select Parameter',
                type: 'danger',
                duration: 6000
            })
        }
        else if (requestJson.ParameterId !== null && area === 0) {
            Toast.show({
                variant: "solid",
                text: 'Please Select Coordinates',
                type: 'danger',
                duration: 6000
            })
        }
        else if (requestJson.ParameterId === null && area === 0) {
            Toast.show({
                variant: "solid",
                text: 'Please Select Parameter and clockwise Coordinates',
                type: 'danger',
                duration: 6000
            })
        }
        else {
            Toast.show({
                variant: "solid",
                text: 'Coordinates should be clockwise. Please clear and reselect it.',
                type: 'danger',
                duration: 6000
            })
        }
    }

    const sendCoordinatesToServer = async (requestJson) => {
        dispatch({ type: SHOW_PROGRESS, isProgressShow: true });
        let apiResponse = await sendCoordinates(requestJson);
        console.log("sendCoordinatesToServer apiResponse", JSON.stringify(apiResponse))
        if (apiResponse.status === 200 && apiResponse.status !== undefined) {
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
        checkCoordinateClockWise,
        sendCoordinatesToServer
    }
}

export default DashboardController;