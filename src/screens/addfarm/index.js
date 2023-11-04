import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  BackHandler,
  TouchableOpacity,
  Image,

  ActivityIndicator
} from 'react-native';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Polygon,
  Overlay,
} from 'react-native-maps';
import DashboardController from '../../view-controllers/dashboardcontroller';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

import styles from './styles';
import { TextInput, RadioButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GOBALCOLOR from '../../gobalconstant/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import validationSchema from './formValidation';
import ProgressScreen from '../highordercomponents/progressscreen';
import AddFarmController from '../../view-controllers/addfarmcontroller';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'react-native-paper';
import { useSelector } from 'react-redux';
import RadioButtonRN from 'radio-buttons-react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons';
import GetLocation from 'react-native-get-location';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const AddFarm = props => {
  const {
    addFarmerFarm,
    goBackScreen,
    updateFarmerFarm,
    accessToken,
    setAccessToken,
  } = AddFarmController();

  const {
    checkCoordinateClockWise,
  } = DashboardController();

  const mapRef = useRef();

  const [lat, setLat] = useState(16.7086167);
  const [long, setLong] = useState(74.1564648);

  let coordinate1Lat = '';
  let coordinate1Long = '';
  let coordinate2Lat = '';
  let coordinate2Long = '';
  let coordinate3Lat = '';
  let coordinate3Long = '';
  let coordinate4Lat = '';
  let coordinate4Long = '';
  /* let coordinate5Lat = '';
  let coordinate5Long = ''; */
  let coordinateArray = [];
  const [isLoad, setIsLoad] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const options = [{ label: 'Add Manually' }, { label: 'Select From Map' }];
  const [selectedGraphType, setSelectedGraphType] = useState('Add Manually');

  const [markers, setMarkers] = useState([]);

  const check = coordinate => {
    /*  if (valueFarmList === null || valueFarmList === '') {
       Toast.show({
         variant: 'solid',
         text: 'Please select farm.',
         type: 'danger',
         duration: 6000,
       });
     } else { */
    console.log('coordinate = ', coordinate);
    console.log('markers = ', markers);
    setMarkers(markers => [...markers, coordinate]);
    /* } */
  };

  useEffect(() => {
    console.log('props == ', props.route.params);

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000,
    })
      .then(location => {
        var pos = {
          lat: location.latitude,
          lng: location.longitude,
        };
        //console.log("location ==", location)
        setLat(location.latitude);
        setLong(location.longitude);
        /* Geocoder.geocodePosition(pos)
                    .then((res) => {
                        let addressObj = res.length >= 0 ? res[0] : null;
                        setFetching(false);
                        const loc = {
                            ...location,
                            address: addressObj ? addressObj.formattedAddress : "",
                        };
                        props.updateDeviceAddress(loc);
                    })
                    .catch((err) => {
                        setFetching(false);
                        if (err == "gprc failed") {
                            onLocationFetch();
                        }
                    }); */
      })
      .catch(error => {
        /* setFetching(false); */
        console.log('error ==', error);
        const { code, message } = error;
      });

    if (props.route.params.comesFrom === 'new') {
      setInitialValues({
        farmName: '',
        farmerName: '',
        latitudeCoordiante1: '',
        longitudeCoordiante1: '',
        latitudeCoordiante2: '',
        longitudeCoordiante2: '',
        latitudeCoordiante3: '',
        longitudeCoordiante3: '',
        latitudeCoordiante4: '',
        longitudeCoordiante4: '',
       /*  latitudeCoordiante5: '',
        longitudeCoordiante5: '', */
      });
      setIsLoad(true);
    } else {
      //let selectedFarm = props.route.params.selectedFarm

      if (props.route.params.selectedFarm.Coordinate) {
        coordinateArray = [
          ...props.route.params.selectedFarm.Coordinate?.split(','),
        ];

        coordinate1Lat = coordinateArray[0];
        coordinate1Long = coordinateArray[1];
        coordinate2Lat = coordinateArray[2];
        coordinate2Long = coordinateArray[3];
        coordinate3Lat = coordinateArray[4];
        coordinate3Long = coordinateArray[5];
        coordinate4Lat = coordinateArray[6];
        coordinate4Long = coordinateArray[7];
     /*    coordinate5Lat = coordinateArray[8];
        coordinate5Long = coordinateArray[9]; */
        console.log('array == ', coordinateArray);

        setInitialValues({
          farmName: props.route.params.selectedFarm.FarmName,
          farmerName: props.route.params.selectedFarm.FarmerName,
          latitudeCoordiante1: coordinate1Lat,
          longitudeCoordiante1: coordinate1Long,
          latitudeCoordiante2: coordinate2Lat,
          longitudeCoordiante2: coordinate2Long,
          latitudeCoordiante3: coordinate3Lat,
          longitudeCoordiante3: coordinate3Long,
          latitudeCoordiante4: coordinate4Lat,
          longitudeCoordiante4: coordinate4Long,
        /*   latitudeCoordiante5: coordinate5Lat,
          longitudeCoordiante5: coordinate5Long */
        });
        setMarkers([{ "latitude": parseFloat(coordinate1Lat), "longitude": parseFloat(coordinate1Long) },
        { "latitude": parseFloat(coordinate2Lat), "longitude": parseFloat(coordinate2Long) },
        { "latitude": parseFloat(coordinate3Lat), "longitude": parseFloat(coordinate3Long) },
        { "latitude": parseFloat(coordinate4Lat), "longitude": parseFloat(coordinate4Long) },
        /* { "latitude": parseFloat(coordinate5Lat), "longitude": parseFloat(coordinate5Long) } */]);
        setIsLoad(true);
      } else {
        setInitialValues({
          farmName: props.route.params.selectedFarm.FarmName,
          farmerName: props.route.params.selectedFarm.FarmerName,
        });
        setMarkers([]);
        setIsLoad(true);
      }
    }

    AsyncStorage.getItem('accessToken').then(accessToken => {
      setAccessToken(accessToken);
    });
  }, []);
  const { isShowModal, isProgressShow } = useSelector(state => state.appReducers);

  const [checked, setChecked] = React.useState(false);

  return (
    <View style={styles.mainContainer}>
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={isProgressShow}
        //Text with the Spinner
        textContent={'Waiting for response from the server...'}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
        overlayColor="rgba(0, 0, 0, 0.5)"
        animation="fade"
        size="large"
        customIndicator={
          <Image
            source={require('../../assets/agvision_logo.png')}
            style={styles.image}
            resizeMode="center"
          />
        }></Spinner>
      <View style={styles.appBarContainer}>
        <View style={{ flexDirection: 'row', position: 'absolute', left: 5 }}>
          <Ionicons
            name="arrow-back"
            size={35}
            style={{ margin: 10, color: '#FFF' }}
            onPress={() => goBackScreen()}
          />
        </View>
        <View style={{ marginLeft: 70 }}>
          <Text style={styles.appBarTitle}>
            {props.route.params.comesFrom === 'new'
              ? `Add Farm Details`
              : `Edit Farm Details`}
          </Text>
        </View>
      </View>
      <KeyboardAwareScrollView style={styles.mainContainer}>
        {isLoad && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
          /* onSubmit={} */
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 10,
                }}>
                <View>
                  <View style={[styles.inputContainer, { marginTop: 10 }]}>
                    <TextInput
                      mode="outlined"
                      label="Farm Name"
                      placeholder="Farm Name"
                      style={styles.input}
                      value={values.farmName}
                      keyboardType="default"
                      // onChangeText={(text) => {
                      //   setFirstName(text);
                      // }}
                      onChangeText={handleChange('farmName')}
                      onBlur={handleBlur('farmName')}
                      activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                      underlineColor={GOBALCOLOR.COLORS.BROWN}
                      activeOutlineColor={
                        errors.farmName && touched.farmName ? 'red' : 'black'
                      }
                      outlineStyle={{ borderWidth: 0.5 }}
                    />
                  </View>
                  {errors.farmName && touched.farmName ? (
                    <Text style={styles.ErrorMessage}>
                      {errors.farmName + ' *'}
                    </Text>
                  ) : null}
                  <View style={[styles.inputContainer, { marginTop: 10 }]}>
                    <TextInput
                      mode="outlined"
                      label="Farmer Name"
                      placeholder="Farmer Name"
                      style={styles.input}
                      value={values.farmerName}
                      keyboardType="default"
                      // onChangeText={(text) => {
                      //   setFirstName(text);
                      // }}
                      onChangeText={handleChange('farmerName')}
                      onBlur={handleBlur('farmerName')}
                      activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                      underlineColor={GOBALCOLOR.COLORS.BROWN}
                      outlineStyle={{ borderWidth: 0.5 }}
                      activeOutlineColor={
                        errors.farmerName && touched.farmerName
                          ? 'red'
                          : 'black'
                      }
                    />
                  </View>
                  {errors.farmerName && touched.farmerName ? (
                    <Text style={styles.ErrorMessage}>
                      {errors.farmerName + ' *'}
                    </Text>
                  ) : null}

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '800',
                        color: GOBALCOLOR.COLORS.BROWN,
                      }}>
                      Want to add farm's map coordinates :
                    </Text>
                    <Checkbox
                      status={checked ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setChecked(!checked);
                      }}
                    />
                  </View>

                  {checked && (
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <RadioButtonRN
                        data={options}
                        boxStyle={styles.boxStyle}
                        style={styles.rbBtn}
                        initial={1}
                        animationTypes={['shake']}
                        box={false}
                        textColor={GOBALCOLOR.COLORS.BLACK}
                        activeColor={GOBALCOLOR.COLORS.ORANAGE}
                        deactiveColor={GOBALCOLOR.COLORS.ORANAGE}
                        textStyle={{
                          fontSize: width / 25,
                          marginLeft: 10,
                        }}
                        icon={
                          <ArrowIcon
                            name="check-circle"
                            size={26}
                            color={GOBALCOLOR.COLORS.ORANAGE}
                          />
                        }
                        selectedBtn={e => setSelectedGraphType(e.label)}
                      />
                    </View>)}

                  {checked && selectedGraphType === 'Add Manually' && (
                    <View>
                      <Text
                        style={{
                          fontSize: 15,
                          marginTop: 15,
                          fontWeight: '600',
                          color: GOBALCOLOR.COLORS.BROWN,
                        }}>
                        Coordinates 1 :
                      </Text>
                      <TextInput
                        mode="outlined"
                        label="Latitude"
                        style={styles.input}
                        value={values.latitudeCoordiante1}
                        keyboardType="numeric"
                        // onChangeText={(text) => {
                        //   setFirstName(text);
                        // }}
                        onChangeText={handleChange('latitudeCoordiante1')}
                        onBlur={handleBlur('latitudeCoordiante1')}
                        activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                        underlineColor={GOBALCOLOR.COLORS.BROWN}
                        activeOutlineColor="black"
                        outlineStyle={{ borderWidth: 0.5 }}
                      />
                      <TextInput
                        mode="outlined"
                        label="Longitude"
                        style={styles.input}
                        value={values.longitudeCoordiante1}
                        keyboardType="numeric"
                        // onChangeText={(text) => {
                        //   setFirstName(text);
                        // }}
                        onChangeText={handleChange('longitudeCoordiante1')}
                        onBlur={handleBlur('longitudeCoordiante1')}
                        activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                        underlineColor={GOBALCOLOR.COLORS.BROWN}
                        activeOutlineColor="black"
                        outlineStyle={{ borderWidth: 0.5 }}
                      />
                      {/* <View style={{flexDirection: 'row', marginTop: 5}}>
                        <View style={{flex: 1}}>
                          <View
                            style={[
                              styles.inputContainer,
                             
                            ]}>
                            <TextInput
                              mode="outlined"
                              label="Latitude"
                              style={styles.input}
                              value={values.latitudeCoordiante1}
                              keyboardType="numeric"
                              // onChangeText={(text) => {
                              //   setFirstName(text);
                              // }}
                              onChangeText={handleChange('latitudeCoordiante1')}
                              onBlur={handleBlur('latitudeCoordiante1')}
                              activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                              underlineColor={GOBALCOLOR.COLORS.BROWN}
                              activeOutlineColor="black"
                              outlineStyle={{borderWidth: 0.5}}
                            />
                          </View>
                          {errors.latitudeCoordiante1 &&
                          touched.latitudeCoordiante1 ? (
                            <Text
                              style={[
                                styles.ErrorMessage,
                                {width: width / 2.2},
                              ]}>
                              {errors.latitudeCoordiante1 + ' *'}
                            </Text>
                          ) : null}
                        </View>
                        <View style={{flex: 1}}>
                          <View
                            style={[
                              styles.inputContainer,
                              {width: width / 2.2, flex: 1, marginLeft: 1},
                            ]}>
                            <TextInput
                              mode="outlined"
                              label="Longitude"
                              style={styles.input}
                              value={values.longitudeCoordiante1}
                              keyboardType="numeric"
                              // onChangeText={(text) => {
                              //   setFirstName(text);
                              // }}
                              onChangeText={handleChange(
                                'longitudeCoordiante1',
                              )}
                              onBlur={handleBlur('longitudeCoordiante1')}
                              activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                              underlineColor={GOBALCOLOR.COLORS.BROWN}
                              activeOutlineColor="black"
                              outlineStyle={{borderWidth: 0.5}}
                            />
                          </View>
                          {errors.longitudeCoordiante1 &&
                          touched.longitudeCoordiante1 ? (
                            <Text
                              style={[
                                styles.ErrorMessage,
                                {width: width / 2.2},
                              ]}>
                              {errors.longitudeCoordiante1 + ' *'}
                            </Text>
                          ) : null}
                        </View>
                      </View> */}
                      <Text
                        style={{
                          fontSize: 15,
                          marginTop: 15,
                          fontWeight: '600',
                          color: GOBALCOLOR.COLORS.BROWN,
                        }}>
                        Coordinates 2 :
                      </Text>
                      <TextInput
                        mode="outlined"
                        label="Latitude"
                        style={styles.input}
                        value={values.latitudeCoordiante2}
                        keyboardType="numeric"
                        // onChangeText={(text) => {
                        //   setFirstName(text);
                        // }}
                        onChangeText={handleChange('latitudeCoordiante2')}
                        onBlur={handleBlur('latitudeCoordiante2')}
                        activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                        underlineColor={GOBALCOLOR.COLORS.BROWN}
                        activeOutlineColor="black"
                        outlineStyle={{ borderWidth: 0.5 }}
                      />
                      <TextInput
                        mode="outlined"
                        label="Longitude"
                        style={styles.input}
                        value={values.longitudeCoordiante2}
                        keyboardType="numeric"
                        // onChangeText={(text) => {
                        //   setFirstName(text);
                        // }}
                        onChangeText={handleChange('longitudeCoordiante2')}
                        onBlur={handleBlur('longitudeCoordiante2')}
                        activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                        underlineColor={GOBALCOLOR.COLORS.BROWN}
                        activeOutlineColor="black"
                        outlineStyle={{ borderWidth: 0.5 }}
                      />
                      {/* <View style={{flexDirection: 'row', marginTop: 5}}>
                        <View style={{flex: 1}}>
                          <View
                            style={[
                              styles.inputContainer,
                              {width: width / 2.2, flex: 1, marginRight: 1},
                            ]}>
                            <TextInput
                              mode="outlined"
                              label="Latitude"
                              style={styles.input}
                              value={values.latitudeCoordiante2}
                              keyboardType="numeric"
                              // onChangeText={(text) => {
                              //   setFirstName(text);
                              // }}
                              onChangeText={handleChange('latitudeCoordiante2')}
                              onBlur={handleBlur('latitudeCoordiante2')}
                              activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                              underlineColor={GOBALCOLOR.COLORS.BROWN}
                              activeOutlineColor="black"
                              outlineStyle={{borderWidth: 0.5}}
                            />
                          </View>
                          {errors.latitudeCoordiante2 &&
                          touched.latitudeCoordiante2 ? (
                            <Text
                              style={[
                                styles.ErrorMessage,
                                {width: width / 2.2},
                              ]}>
                              {errors.latitudeCoordiante2 + ' *'}
                            </Text>
                          ) : null}
                        </View>
                        <View style={{flex: 1}}>
                          <View
                            style={[
                              styles.inputContainer,
                              {width: width / 2.2, flex: 1, marginLeft: 1},
                            ]}>
                            <TextInput
                              mode="outlined"
                              label="Longitude"
                              style={styles.input}
                              value={values.longitudeCoordiante2}
                              keyboardType="numeric"
                              // onChangeText={(text) => {
                              //   setFirstName(text);
                              // }}
                              onChangeText={handleChange(
                                'longitudeCoordiante2',
                              )}
                              onBlur={handleBlur('longitudeCoordiante2')}
                              activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                              underlineColor={GOBALCOLOR.COLORS.BROWN}
                              activeOutlineColor="black"
                              outlineStyle={{borderWidth: 0.5}}
                            />
                          </View>
                          {errors.latitudeCoordiante2 &&
                          touched.latitudeCoordiante2 ? (
                            <Text
                              style={[
                                styles.ErrorMessage,
                                {width: width / 2.2},
                              ]}>
                              {errors.latitudeCoordiante2 + ' *'}
                            </Text>
                          ) : null}
                        </View>
                      </View> */}
                      <Text
                        style={{
                          fontSize: 15,
                          marginTop: 15,
                          fontWeight: '600',
                          color: GOBALCOLOR.COLORS.BROWN,
                        }}>
                        Coordinates 3 :
                      </Text>
                      <TextInput
                        mode="outlined"
                        label="Latitude"
                        style={styles.input}
                        value={values.latitudeCoordiante3}
                        keyboardType="numeric"
                        // onChangeText={(text) => {
                        //   setFirstName(text);
                        // }}
                        onChangeText={handleChange('latitudeCoordiante3')}
                        onBlur={handleBlur('latitudeCoordiante3')}
                        activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                        underlineColor={GOBALCOLOR.COLORS.BROWN}
                        activeOutlineColor="black"
                        outlineStyle={{ borderWidth: 0.5 }}
                      />
                      <TextInput
                        mode="outlined"
                        label="Longitude"
                        style={styles.input}
                        value={values.longitudeCoordiante3}
                        keyboardType="numeric"
                        // onChangeText={(text) => {
                        //   setFirstName(text);
                        // }}
                        onChangeText={handleChange('longitudeCoordiante3')}
                        onBlur={handleBlur('longitudeCoordiante3')}
                        activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                        underlineColor={GOBALCOLOR.COLORS.BROWN}
                        activeOutlineColor="black"
                        outlineStyle={{ borderWidth: 0.5 }}
                      />
                      {/* <View style={{flexDirection: 'row', marginTop: 5}}>
                        <View style={{flex: 1}}>
                          <View
                            style={[
                              styles.inputContainer,
                              {width: width / 2.2, flex: 1, marginRight: 1},
                            ]}>
                            <TextInput
                              mode="outlined"
                              label="Latitude"
                              style={styles.input}
                              value={values.latitudeCoordiante3}
                              keyboardType="numeric"
                              // onChangeText={(text) => {
                              //   setFirstName(text);
                              // }}
                              onChangeText={handleChange('latitudeCoordiante3')}
                              onBlur={handleBlur('latitudeCoordiante3')}
                              activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                              underlineColor={GOBALCOLOR.COLORS.BROWN}
                              activeOutlineColor="black"
                              outlineStyle={{borderWidth: 0.5}}
                            />
                            
                          </View>
                          {errors.latitudeCoordiante3 &&
                          touched.latitudeCoordiante3 ? (
                            <Text
                              style={[
                                styles.ErrorMessage,
                                {width: width / 2.2},
                              ]}>
                              {errors.latitudeCoordiante3 + ' *'}
                            </Text>
                          ) : null}
                        </View>
                        <View style={{flex: 1}}>
                          <View
                            style={[
                              styles.inputContainer,
                              {width: width / 2.2, flex: 1, marginLeft: 1},
                            ]}>
                            <TextInput
                              mode="outlined"
                              label="Longitude"
                              style={styles.input}
                              value={values.longitudeCoordiante3}
                              keyboardType="numeric"
                              // onChangeText={(text) => {
                              //   setFirstName(text);
                              // }}
                              onChangeText={handleChange(
                                'longitudeCoordiante3',
                              )}
                              onBlur={handleBlur('longitudeCoordiante3')}
                              activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                              underlineColor={GOBALCOLOR.COLORS.BROWN}
                              activeOutlineColor="black"
                              outlineStyle={{borderWidth: 0.5}}
                            />
                          </View>
                          {errors.longitudeCoordiante3 &&
                          touched.longitudeCoordiante3 ? (
                            <Text
                              style={[
                                styles.ErrorMessage,
                                {width: width / 2.2},
                              ]}>
                              {errors.longitudeCoordiante3 + ' *'}
                            </Text>
                          ) : null}
                        </View>
                      </View> */}
                      <Text
                        style={{
                          fontSize: 15,
                          marginTop: 15,
                          fontWeight: '600',
                          color: GOBALCOLOR.COLORS.BROWN,
                        }}>
                        Coordinates 4 :
                      </Text>
                      <TextInput
                        mode="outlined"
                        label="Latitude"
                        style={styles.input}
                        value={values.latitudeCoordiante4}
                        keyboardType="numeric"
                        // onChangeText={(text) => {
                        //   setFirstName(text);
                        // }}
                        onChangeText={handleChange('latitudeCoordiante4')}
                        onBlur={handleBlur('latitudeCoordiante4')}
                        activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                        underlineColor={GOBALCOLOR.COLORS.BROWN}
                        activeOutlineColor="black"
                        outlineStyle={{ borderWidth: 0.5 }}
                      />
                      <TextInput
                        mode="outlined"
                        label="Longitude"
                        style={styles.input}
                        value={values.longitudeCoordiante4}
                        keyboardType="numeric"
                        // onChangeText={(text) => {
                        //   setFirstName(text);
                        // }}
                        onChangeText={handleChange('longitudeCoordiante4')}
                        onBlur={handleBlur('longitudeCoordiante4')}
                        activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                        underlineColor={GOBALCOLOR.COLORS.BROWN}
                        activeOutlineColor="black"
                        outlineStyle={{ borderWidth: 0.5 }}
                      />
                      {/* <View style={{flexDirection: 'row', marginTop: 5}}>
                        <View style={{flex: 1}}>
                          <View
                            style={[
                              styles.inputContainer,
                              {width: width / 2.2, flex: 1, marginRight: 1},
                            ]}>
                            <TextInput
                              mode="outlined"
                              label="Latitude"
                              style={styles.input}
                              value={values.latitudeCoordiante4}
                              keyboardType="numeric"
                              // onChangeText={(text) => {
                              //   setFirstName(text);
                              // }}
                              onChangeText={handleChange('latitudeCoordiante4')}
                              onBlur={handleBlur('latitudeCoordiante4')}
                              activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                              underlineColor={GOBALCOLOR.COLORS.BROWN}
                              activeOutlineColor="black"
                              outlineStyle={{borderWidth: 0.5}}
                            />
                          </View>
                          {errors.latitudeCoordiante4 &&
                          touched.latitudeCoordiante4 ? (
                            <Text
                              style={[
                                styles.ErrorMessage,
                                {width: width / 2.2},
                              ]}>
                              {errors.latitudeCoordiante4 + ' *'}
                            </Text>
                          ) : null}
                        </View>
                        <View style={{flex: 1}}>
                          <View
                            style={[
                              styles.inputContainer,
                              {width: width / 2.2, flex: 1, marginLeft: 1},
                            ]}>
                            <TextInput
                              mode="outlined"
                              label="Longitude"
                              style={styles.input}
                              value={values.longitudeCoordiante4}
                              keyboardType="numeric"
                              // onChangeText={(text) => {
                              //   setFirstName(text);
                              // }}
                              onChangeText={handleChange(
                                'longitudeCoordiante4',
                              )}
                              onBlur={handleBlur('longitudeCoordiante4')}
                              activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                              underlineColor={GOBALCOLOR.COLORS.BROWN}
                              activeOutlineColor="black"
                              outlineStyle={{borderWidth: 0.5}}
                            />
                          </View>
                          {errors.longitudeCoordiante4 &&
                          touched.longitudeCoordiante4 ? (
                            <Text
                              style={[
                                styles.ErrorMessage,
                                {width: width / 2.2},
                              ]}>
                              {errors.longitudeCoordiante4 + ' *'}
                            </Text>
                          ) : null}
                        </View>
                      </View> */}
                      {/* <Text
                        style={{
                          fontSize: 15,
                          marginTop: 15,
                          fontWeight: '600',
                          color: GOBALCOLOR.COLORS.BROWN,
                        }}>
                        Coordinates 5 :
                      </Text>
                      <TextInput
                        mode="outlined"
                        label="Latitude"
                        style={styles.input}
                        value={values.latitudeCoordiante5}
                        keyboardType="numeric"
                        // onChangeText={(text) => {
                        //   setFirstName(text);
                        // }}
                        onChangeText={handleChange('latitudeCoordiante5')}
                        onBlur={handleBlur('latitudeCoordiante5')}
                        activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                        underlineColor={GOBALCOLOR.COLORS.BROWN}
                        activeOutlineColor="black"
                        outlineStyle={{ borderWidth: 0.5 }}
                      />
                      <TextInput
                        mode="outlined"
                        label="Longitude"
                        style={styles.input}
                        value={values.longitudeCoordiante5}
                        keyboardType="numeric"
                        // onChangeText={(text) => {
                        //   setFirstName(text);
                        // }}
                        onChangeText={handleChange('longitudeCoordiante5')}
                        onBlur={handleBlur('longitudeCoordiante5')}
                        activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                        underlineColor={GOBALCOLOR.COLORS.BROWN}
                        activeOutlineColor="black"
                        outlineStyle={{ borderWidth: 0.5 }}
                      /> */}
                      {/* <View style={{flexDirection: 'row', marginTop: 5}}>
                        <View style={{flex: 1}}>
                          <View
                            style={[
                              styles.inputContainer,
                              {width: width / 2.2, flex: 1, marginRight: 1},
                            ]}>
                            <TextInput
                              mode="outlined"
                              label="Latitude"
                              style={styles.input}
                              value={values.latitudeCoordiante5}
                              keyboardType="numeric"
                              // onChangeText={(text) => {
                              //   setFirstName(text);
                              // }}
                              onChangeText={handleChange('latitudeCoordiante5')}
                              onBlur={handleBlur('latitudeCoordiante5')}
                              activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                              underlineColor={GOBALCOLOR.COLORS.BROWN}
                              activeOutlineColor="black"
                              outlineStyle={{borderWidth: 0.5}}
                            />
                          </View>
                          {errors.latitudeCoordiante5 &&
                          touched.latitudeCoordiante5 ? (
                            <Text
                              style={[
                                styles.ErrorMessage,
                                {width: width / 2.2},
                              ]}>
                              {errors.latitudeCoordiante5 + ' *'}
                            </Text>
                          ) : null}
                        </View>
                        <View style={{flex: 1}}>
                          <View
                            style={[
                              styles.inputContainer,
                              {width: width / 2.2, flex: 1, marginLeft: 1},
                            ]}>
                            <TextInput
                              mode="outlined"
                              label="Longitude"
                              style={styles.input}
                              value={values.longitudeCoordiante5}
                              keyboardType="numeric"
                              // onChangeText={(text) => {
                              //   setFirstName(text);
                              // }}
                              onChangeText={handleChange(
                                'longitudeCoordiante5',
                              )}
                              onBlur={handleBlur('longitudeCoordiante5')}
                              activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                              underlineColor={GOBALCOLOR.COLORS.BROWN}
                              activeOutlineColor="black"
                              outlineStyle={{borderWidth: 0.5}}
                            />
                          </View>
                          {errors.longitudeCoordiante5 &&
                          touched.longitudeCoordiante5 ? (
                            <Text
                              style={[
                                styles.ErrorMessage,
                                {width: width / 2.2},
                              ]}>
                              {errors.longitudeCoordiante5 + ' *'}
                            </Text>
                          ) : null}
                        </View>
                      </View> */}
                    </View>
                  )}
                  {checked && selectedGraphType === 'Select From Map' &&
                    (<View
                      style={{
                        marginTop: 10,
                        overflow: 'hidden',
                        height: deviceHeight / 1.5,
                      }}>
                      <View
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          left: 0,
                          top: 0,
                        }}>

                        <MapView
                          mapType="hybrid"
                          style={{
                            height: deviceHeight * 0.83,
                            width: deviceWidth,
                          }}
                          ref={mapRef}
                          initialRegion={{
                            latitude: lat,
                            longitude: long,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                          }}
                          onPress={e =>
                            check(e.nativeEvent.coordinate)
                          }>
                          {markers.length > 3 && (
                            <Polygon
                              coordinates={markers}
                              strokeColor="#000"
                              strokeWidth={2}
                              fillColor="#00000022"></Polygon>
                          )}

                          {markers.length > 0 &&
                            markers.map((marker, i) => {
                              //console.log('marker ==', marker)
                              return <Marker coordinate={marker} key={i} draggable />;
                            })}
                        </MapView>
                        <TouchableOpacity
                          style={styles.mapBtn}
                          onPress={() => setMarkers([])}>
                          <Text style={styles.maBtnText}>Clear Area Section</Text>
                        </TouchableOpacity>
                      </View>
                    </View>)}
                </View>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  disabled={!isValid || !values.farmName || !values.farmerName}
                  onPress={() =>
                    props.route.params.comesFrom == 'new'
                      ? addFarmerFarm({
                        FarmName: values.farmName,
                        FarmerName: values.farmerName,
                        authToken: accessToken,
                        Coordinate:
                          checked === true
                            ? selectedGraphType === 'Add Manually' ? `${values.latitudeCoordiante1},${values.longitudeCoordiante1},${values.latitudeCoordiante2},${values.longitudeCoordiante2},${values.latitudeCoordiante3},${values.longitudeCoordiante3},${values.latitudeCoordiante4},${values.longitudeCoordiante4}`
                              : `${markers[0].latitude},${markers[0].longitude},${markers[1].latitude},${markers[1].longitude},${markers[2].latitude},${markers[2].longitude},${markers[3].latitude},${markers[3].longitude}` : '',
                      })
                      : updateFarmerFarm({
                        id: parseInt(props.route.params.selectedFarm.id),
                        FarmName: values.farmName,
                        FarmerName: values.farmerName,
                        authToken: accessToken,
                        Coordinate:
                          checked === true
                            ? selectedGraphType === 'Add Manually' ? `${values.latitudeCoordiante1},${values.longitudeCoordiante1},${values.latitudeCoordiante2},${values.longitudeCoordiante2},${values.latitudeCoordiante3},${values.longitudeCoordiante3},${values.latitudeCoordiante4},${values.longitudeCoordiante4}`
                              : `${markers[0].latitude},${markers[0].longitude},${markers[1].latitude},${markers[1].longitude},${markers[2].latitude},${markers[2].longitude},${markers[3].latitude},${markers[3].longitude}` : '',
                      })
                  }>
                  <Text style={styles.buttonText}>
                    {props.route.params.comesFrom === 'new'
                      ? `Add Farm`
                      : `Edit Farm`}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        )}
        {/* <ProgressScreen /> */}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddFarm;
