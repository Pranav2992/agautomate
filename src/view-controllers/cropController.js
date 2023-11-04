import React, { useState } from 'react';
import { Toast } from 'native-base';
import { useDispatch } from 'react-redux';
import { SHOW_PROGRESS } from '../store/types';
import { useNavigation } from '@react-navigation/native';
import CropViewmModel from '../view-models/cropModel';

const CropController = () => {
  const dispatch = useDispatch();
  const { addCropDetails, CropList, CropDetailsList, getCropVariety } = CropViewmModel();
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = useState('');

  const goBackScreen = () => {
    navigation.goBack();
  };

  const addCropDetail = async requestJson => {
    try {
      dispatch({ type: SHOW_PROGRESS, isProgressShow: true });
      let apiResponse = await addCropDetails(requestJson);
      // console.log('addCropDetails apiResponse', JSON.stringify(apiResponse));
      if (apiResponse.status === 200 && apiResponse.status !== undefined) {
        Toast.show({
          variant: 'solid',
          text: 'Crop details added successfully.',
          type: 'success',
          duration: 6000,
        });
        navigation.navigate('CropList');
      } else {
        Toast.show({
          variant: 'solid',
          text: 'Something went wrong. Please try again !.',
          type: 'danger',
          duration: 6000,
        });
      }
    } catch (error) {
      console.log('error --- ', error);
    }
  };

  const Crop_List = async requestJson => {
    try {
      dispatch({ type: SHOW_PROGRESS, isProgressShow: true });
      let apiResponse = await CropList(requestJson);
      // console.log('CropList apiResponse', JSON.stringify(apiResponse));
      if (apiResponse.status === 200 && apiResponse.status !== undefined) {
        // Toast.show({
        //     variant: "solid",
        //     text: 'Farm updated successfully.',
        //     type: 'success',
        //     duration: 3000
        // })
        navigation.navigate('CropList');
      } else {
        // Toast.show({
        //   variant: 'solid',
        //   text: 'Something went wrong. Please try again !.',
        //   type: 'danger',
        //   duration: 6000,
        // });
      }
    } catch (error) {
      console.log('error --- ', error);
    }
  };
  const Crop_Details_List = async requestJson => {
    try {
      dispatch({ type: SHOW_PROGRESS, isProgressShow: true });
      let apiResponse = await CropDetailsList(requestJson);
      // console.log('CropDetailsList apiResponse', JSON.stringify(apiResponse));
      if (apiResponse.status === 200 && apiResponse.status !== undefined) {
        // Toast.show({
        //     variant: "solid",
        //     text: 'Farm updated successfully.',
        //     type: 'success',
        //     duration: 3000
        // })
        navigation.navigate('CropList');
      } else {
        // Toast.show({
        //   variant: 'solid',
        //   text: 'Something went wrong. Please try again !.',
        //   type: 'danger',
        //   duration: 6000,
        // });
      }
    } catch (error) {
      console.log('error --- ', error);
    }
  };

  const getVarietyOfCrop = async (requestJson) => {
    try {
      let apiResponse = await getCropVariety(requestJson);

    } catch (error) {
      console.log('error --- ', error);
    }
  }
  return {
    addCropDetail,
    Crop_List,
    Crop_Details_List,
    goBackScreen,
    setAccessToken,
    getVarietyOfCrop
  };
};
export default CropController;
