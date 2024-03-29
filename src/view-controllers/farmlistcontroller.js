import React, { useState } from 'react';
import { Toast } from 'native-base';
import { useDispatch } from 'react-redux';
import { SHOW_PROGRESS } from '../store/types';
import FarmListViewModel from '../view-models/farmlistviewmodel';
import { useNavigation } from '@react-navigation/native';

const FarmListController = () => {
    const navigation = useNavigation();
    const { farmList } = FarmListViewModel();
    const dispatch = useDispatch();

    const goBackScreen = () => {
        navigation.goBack();
    }

    const getFarmList = async (requestJson) => {
        try {
            dispatch({ type: SHOW_PROGRESS, isProgressShow: true });
            let apiResponse = await farmList(requestJson);
            if (apiResponse.status === 200 && apiResponse.status !== undefined) {
                /* Toast.show({
                    variant: "solid",
                    text: 'Add Farm successfully.',
                    type: 'success',
                    duration: 6000
                }); */
            }
            else {
               /*  Toast.show({
                    variant: "solid",
                    text: 'Something went wrong. Please try again !.',
                    type: 'danger',
                    duration: 6000
                }) */
            }
        } catch (error) {
            console.log('error --- ', error);
        }
    }

    return {
        goBackScreen,
        getFarmList
    }
}

export default FarmListController;

