import React, { useState } from 'react';
import { Toast } from 'native-base';
import { useDispatch } from 'react-redux';
import { SHOW_PROGRESS } from '../store/types';
import AddFarmViewModel from '../view-models/addfarmviewmodel';
import { useNavigation } from '@react-navigation/native';

const AddFarmController = () => {
    const dispatch = useDispatch();
    const { addFarm, updateFarm } = AddFarmViewModel();
    const navigation = useNavigation();
    const [accessToken, setAccessToken] = useState('');

    const goBackScreen = () => {
        navigation.goBack();
    }

    const addFarmerFarm = async (requestJson) => {
        try {
            dispatch({ type: SHOW_PROGRESS, isProgressShow: true });
            let apiResponse = await addFarm(requestJson);
            console.log("addFarmerFarm apiResponse", JSON.stringify(apiResponse))
            if (apiResponse.status === 200 && apiResponse.status !== undefined) {
                Toast.show({
                    variant: "solid",
                    text: 'Add Farm successfully.',
                    type: 'success',
                    duration: 6000
                })
            }
            else {
                Toast.show({
                    variant: "solid",
                    text: 'Something went wrong. Please try again !.',
                    type: 'danger',
                    duration: 6000
                })
            }
        } catch (error) {
            console.log('error --- ', error);
        }
    }

    const updateFarmerFarm = async (requestJson) => {
        try {
            dispatch({ type: SHOW_PROGRESS, isProgressShow: true });
            let apiResponse = await updateFarm(requestJson);
            console.log("addFarmerFarm apiResponse", JSON.stringify(apiResponse))
            if (apiResponse.status === 200 && apiResponse.status !== undefined) {
                Toast.show({
                    variant: "solid",
                    text: 'Update Farm successfully.',
                    type: 'success',
                    duration: 6000
                })

            }
            else {
                Toast.show({
                    variant: "solid",
                    text: 'Something went wrong. Please try again !.',
                    type: 'danger',
                    duration: 6000
                })
            }
        } catch (error) {
            console.log('error --- ', error);
        }
    }


    return {
        addFarmerFarm,
        updateFarmerFarm,
        goBackScreen,
        accessToken,
        setAccessToken
    }
}
export default AddFarmController;