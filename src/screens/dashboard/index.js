import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  BackHandler,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from './styles';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Polygon,
  Overlay,
} from 'react-native-maps';
import { connect, useSelector, useDispatch } from 'react-redux';
import { SHOW_MODAL, SHOW_PROGRESS } from '../../store/types';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Toast } from 'native-base';
import GOBALCOLOR from '../../gobalconstant/colors';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  Container,
  Content,
  ListItem,
  Left,
  Input,
  Right,
  Radio,
  Icon,
  List,
  Body,
  Title,
  Button,
  Grid,
  Row,
  Col,
  Picker,
  Item,
  Tab,
  Tabs,
  Footer,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashboardController from '../../view-controllers/dashboardcontroller';
import { ScrollView } from 'react-native-gesture-handler';
import ProgressScreen from '../highordercomponents/progressscreen';
import { farmList as getFarmList } from '../../store/actions/apiCallActions';
import Spinner from 'react-native-loading-spinner-overlay';
import NavigationBottomTab from '../../navigation/bottomNavigation';
import Header from '../highordercomponents/header/header';
import { Dropdown } from 'react-native-element-dropdown';
import CropController from '../../view-controllers/cropController';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const DashboardScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    setAccessToken,
    setUserId,
    checkCoordinateClockWise,
    userId,
    accessToken,
    openFarmList,
    valueFarmList,
    setOpenFarmList,
    goBackScreen,
    setValuefarmList,
  } = DashboardController();
  const { Crop_Details_List } =
    CropController();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Yeild', value: '1' },
    { label: 'Pol In Cane', value: '2' },
    { label: 'Water Stress', value: '3' },
  ]);
  const [isFocus, setIsFocus] = useState(false);

  const [lat, setLat] = useState(16.7086167);
  const [long, setLong] = useState(74.1564648);
  const [loadMap, setLoadMap] = useState(false);
  //const [isShowModal, setIsShowModal] = useState(false);
  const [markers, setMarkers] = useState([]);

  const [farmHasCoordinates, setFarmHasCoordinates] = useState(false);

  const check = coordinate => {
    if (valueFarmList === null || valueFarmList === '') {
      Toast.show({
        variant: 'solid',
        text: 'Please select farm.',
        type: 'danger',
        duration: 6000,
      });
    } else {
      console.log('coordinate = ', coordinate);
      console.log('markers = ', markers);
      setMarkers(markers => [...markers, coordinate]);
    }
  };

  const { isShowModal, isProgressShow } = useSelector(state => state.appReducers);
  const { sendCoordinatesResponse } = useSelector(state => state.apiCallReducers);
  const { farmList } = useSelector(state => state.apiCallReducers);
  const { cropDetailsList } = useSelector(state => state.apiCallReducers);
  const [selectedFarm, setSelectedFarm] = useState('');

  const mapRef = useRef();

  useEffect(() => {
    console.log('isShowModal ===', isShowModal);
    console.log('sendCoordinatesResponse ===', sendCoordinatesResponse);
    AsyncStorage.getItem('accessToken').then(accessToken => {
      setAccessToken(accessToken);
      dispatch(
        getFarmList({
          authToken: accessToken,
        }),
        Crop_Details_List({
          authToken: accessToken,
        }),
      );
    });
    AsyncStorage.getItem('userId').then(userId => {
      setUserId(userId);
    });
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
        setLoadMap(true);

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
  }, [sendCoordinatesResponse]);

  const zoomToCoordinatesOnMap = selectedFarm => {
    console.log('selectedFarm = ', selectedFarm);

    if (selectedFarm.Coordinate !== null) {
      var coordinates = selectedFarm.Coordinate.split(',');

      if (coordinates[0] && coordinates[7]) {
        console.log('coordinates = ', coordinates);

        var finalCoordinates = [
          {
            latitude: parseFloat(coordinates[0]),
            longitude: parseFloat(coordinates[1]),
          },
          {
            latitude: parseFloat(coordinates[2]),
            longitude: parseFloat(coordinates[3]),
          },
          {
            latitude: parseFloat(coordinates[4]),
            longitude: parseFloat(coordinates[5]),
          },
          {
            latitude: parseFloat(coordinates[6]),
            longitude: parseFloat(coordinates[7]),
          },
          // { "latitude": parseFloat(coordinates[8]), "longitude": parseFloat(coordinates[9]) }
        ];

        setMarkers([...finalCoordinates]);

        setTimeout(() => {
          // console.log('markers =', markers)

          if (mapRef.current) {
            // console.log('map ref if')
            // list of _id's must same that has been provided to the identifier props of the Marker
            mapRef.current.fitToCoordinates(finalCoordinates);
          }
        }, 1500);
        setFarmHasCoordinates(true);
      }
    } else {
      setFarmHasCoordinates(false);
    }
  };
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };
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
        <View style={{ flexDirection: 'row', position: 'absolute', left: 0 }}>
          <Ionicons
            name="arrow-back"
            size={30}
            style={{ margin: 10, color: '#FFF' }}
            onPress={() => goBackScreen()}
          />
        </View>
        <View style={{ marginLeft: 50 }}>
          <Text style={styles.appBarTitle}>My Farm Reports</Text>
        </View>
        <View style={{ flexDirection: 'row', position: 'absolute', right: 0 }}>
          {/* <MaterialCommunityIcons
            name="barn"
            size={32}
            style={{margin: 10, color: '#FFF'}}
            onPress={() => navigation.navigate('HomeScreen')}
          />
          <MaterialCommunityIcons
            name="chart-bar"
            size={32}
            style={{margin: 10, color: '#FFF'}}
            onPress={() => navigation.navigate('GraphReportScreen')}
          />
          <MaterialCommunityIcons
            name="account-circle"
            size={32}
            style={{margin: 10, color: '#FFF'}}
          /> */}
          {/* <MaterialCommunityIcons
            name="logout"
            size={32}
            style={{ margin: 10, color: '#FFF' }}
            onPress={() => {
              Alert.alert('Logout', 'Do you want to logout?', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => {
                    AsyncStorage.setItem('isLogged', 'false');
                    dispatch({ type: 'USER_LOGGED', userLogged: false });
                    navigation.dispatch(StackActions.popToTop());
                  },
                },
              ]);
            }}
          /> */}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ minHeight: '100%' }}
        scrollToOverflowEnabled={true}>
        <View style={{ flex: 1, marginBottom: 100 }}>
          {/* <Text style={{color:'grey',fontSize:25,paddingTop:25,fontWeight:'bold',textAlign:'center'}}>Generate Farm Report</Text> */}
          <View style={styles.dropdownContainer}>
            {/* <View style={[styles.inputContainer]}>
              <TextInput
                mode="flat"
                label="Crop Name"
                style={styles.input}
                value={'Sugarcane'}
                keyboardType="default"
                onChangeText={text => {}}
                activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                underlineColor={GOBALCOLOR.COLORS.BROWN}
              />
            </View> */}
            {/* <View style={styles.container}>
              <Text style={[styles.label, isFocus && {color: 'blue'}]}>
              Select Crop
              </Text>
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={items}
                itemTextStyle={{color: '#333333'}}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Crop"
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View> */}
            <View style={styles.container}>
              <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                Select Farm
              </Text>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={farmList}
                itemTextStyle={{ color: '#333333' }}
                search
                maxHeight={300}
                labelField="FarmName"
                valueField="id"
                placeholder="Select Farm"
                searchPlaceholder="Search..."
                value={valueFarmList}
                onChange={item => {
                  console.log('item === ', item)
                  setValuefarmList(item.id);
                  setSelectedFarm(item.FarmName);
                  zoomToCoordinatesOnMap(item)
                }}
              />
            </View>

            <View style={styles.container}>
              <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                Select Parameter
              </Text>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={items}
                itemTextStyle={{ color: '#333333' }}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Parameter"
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
            {/*  <View style={[styles.inputContainer, { marginTop: 10 }]}>
              <DropDownPicker
                placeholder="Select Parameter"
                style={styles.inputDropdown}
                open={open}
                value={value}
                items={items}
                listMode="MODAL"
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
            </View> */}
            {/* <View style={[styles.inputContainer, {marginTop: 10}]}>
              <DropDownPicker
                schema={{
                  label: 'FarmName',
                  value: 'id',
                }}
                placeholder="Select Farm"
                style={styles.inputDropdown}
                open={openFarmList}
                value={valueFarmList}
                items={farmList}
                listMode="MODAL"
                setOpen={setOpenFarmList}
                setValue={setValuefarmList}
                //setItems={setItems}
                onSelectItem={item => zoomToCoordinatesOnMap(item)}
              />
            </View> */}
          </View>
          <View
            style={{
              margin: 8,
              /* width: deviceWidth, */
              /*  position: 'absolute',
                     bottom: 0, */
              overflow: 'hidden',
              /* borderTopLeftRadius: 25,
                    borderTopRightRadius: 25, */
              /*  shadowColor: '#000',
                     shadowOffset: { width: 1, height: 1 },
                     shadowOpacity: 0.2, */
              height: '65%',
              justifyContent: 'center',
              alignItems: 'center',
              /* elevation: 7 */
            }}>
            {loadMap ? (
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
                    !farmHasCoordinates && check(e.nativeEvent.coordinate)
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
                {farmHasCoordinates === false ? (
                  <TouchableOpacity
                    style={styles.mapBtn}
                    onPress={() => setMarkers([])}>
                    <Text style={styles.maBtnText}>Clear Area Section</Text>
                  </TouchableOpacity>
                ) : (
                  ''
                )}
              </View>
            ) : (
              <ActivityIndicator
                color={GOBALCOLOR.COLORS.DARK_BLUE}
                size={'large'}
              />
            )}
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                checkCoordinateClockWise({
                  FarmerId: userId,
                  authToken: accessToken,
                  Coordinate: markers,
                  FarmId: '' + valueFarmList,
                  ParameterId: value,
                });
              }}>
              <Text style={styles.buttonText}>Generate Report</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          isVisible={isShowModal}
          animationIn="bounceIn"
          animationOut="bounceOut"
          coverScreen={true}
          hasBackdrop={true}
          animationInTiming={500}
          animationOutTiming={500}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={500}
          backdropColor="black"
          backdropOpacity={0.7}>
          <View
            style={{
              borderRadius: 5,
              padding: 20,
              width: '100%',
              alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: GOBALCOLOR.COLORS.WHITE,
            }}>
            <Text
              style={{
                marginBottom: 30,
                color: GOBALCOLOR.COLORS.BLACK,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Generated Report
            </Text>
            {/* <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ width: 300, height: 200 }} resizeMode="stretch" /> */}
            {value === '1' && (
              <Text
                style={{
                  marginBottom: 10,
                  marginTop: 10,
                  color: GOBALCOLOR.COLORS.BLACK,
                  fontSize: 16,
                }}>{`Your ${selectedFarm}'s estimated yield ${parseFloat(
                  sendCoordinatesResponse?.data.ParameterValue,
                ).toFixed(2)} tonne/ha`}</Text>
            )}
            {value === '2' && (
              <View>
                <Text
                  style={{
                    marginBottom: 10,
                    marginTop: 10,
                    color: GOBALCOLOR.COLORS.BLACK,
                    fontSize: 16,
                  }}>{`${selectedFarm}'s estimated pol in cane ${parseFloat(
                    sendCoordinatesResponse?.data.ParameterValue,
                  ).toFixed(2)} %`}</Text>
                <Text
                  style={{
                    color: GOBALCOLOR.COLORS.BLACK,
                    fontSize: 16,
                  }}>{`Comment :- `}</Text>
                {(parseFloat(sendCoordinatesResponse?.data.ParameterValue) >= 0 && parseFloat(sendCoordinatesResponse?.data.ParameterValue) <= 5) &&
                  < Text style={{
                    marginBottom: 10,
                    marginTop: 10,
                    color: GOBALCOLOR.COLORS.RED,
                    backgroundColor: GOBALCOLOR.COLORS.BLACK,
                    padding: 10,
                    borderRadius: 5,
                    fontSize: 16,
                  }}>Pol in cane is poor.</Text>}
                {(parseFloat(sendCoordinatesResponse?.data.ParameterValue) > 5 && parseFloat(sendCoordinatesResponse?.data.ParameterValue) <= 8) &&
                  < Text style={{
                    marginBottom: 10,
                    marginTop: 10,
                    color: GOBALCOLOR.COLORS.YELLOW,
                    backgroundColor: GOBALCOLOR.COLORS.BLACK,
                    padding: 10,
                    borderRadius: 5,
                    fontSize: 16,
                  }}>Pol in cane is Moderate.</Text>}
                {(parseFloat(sendCoordinatesResponse?.data.ParameterValue) > 8 && parseFloat(sendCoordinatesResponse?.data.ParameterValue) <= 13) &&
                  < Text style={{
                    marginBottom: 10,
                    marginTop: 10,
                    color: GOBALCOLOR.COLORS.LIGHT_GREEN,
                    backgroundColor: GOBALCOLOR.COLORS.BLACK,
                    padding: 10,
                    borderRadius: 5,
                    fontSize: 16,
                  }}>Pol in cane is Good.</Text>}
                {parseFloat(sendCoordinatesResponse?.data.ParameterValue) > 13 &&
                  < Text style={{
                    marginBottom: 10,
                    marginTop: 10,
                    color: GOBALCOLOR.COLORS.GREEN_2,
                    backgroundColor: GOBALCOLOR.COLORS.BLACK,
                    padding: 10,
                    borderRadius: 5,
                    fontSize: 16,
                  }}>Pol in cane is Excellent.</Text>}
              </View>

            )}
            {value === '3' && (
              <View>
                <Text
                  style={{
                    marginBottom: 10,
                    marginTop: 10,
                    color: GOBALCOLOR.COLORS.BLACK,
                    fontSize: 16,
                  }}>{`Your ${selectedFarm}'s estimated water stress ${parseFloat(
                    sendCoordinatesResponse?.data.ParameterValue,
                  ).toFixed(2)}`}</Text>

                <Text
                  style={{
                    color: GOBALCOLOR.COLORS.BLACK,
                    fontSize: 16,
                  }}>{`Comment :- `}</Text>

                {(parseFloat(sendCoordinatesResponse?.data.ParameterValue) >= 0 && parseFloat(sendCoordinatesResponse?.data.ParameterValue) <= 0.3) &&
                  < Text style={{
                    marginBottom: 10,
                    marginTop: 10,
                    color: GOBALCOLOR.COLORS.RED,
                    backgroundColor: GOBALCOLOR.COLORS.BLACK,
                    padding: 10,
                    borderRadius: 5,
                    fontSize: 16,
                  }}>Highly Stressed, Need Immediate Irrigation</Text>}
                {(parseFloat(sendCoordinatesResponse?.data.ParameterValue) > 0.3 && parseFloat(sendCoordinatesResponse?.data.ParameterValue) <= 0.6) &&
                  < Text style={{
                    marginBottom: 10,
                    marginTop: 10,
                    color: GOBALCOLOR.COLORS.YELLOW,
                    backgroundColor: GOBALCOLOR.COLORS.BLACK,
                    padding: 10,
                    borderRadius: 5,
                    fontSize: 16,
                  }}>Moderately Stressed, Need Attention & Irrigate if required</Text>}
                {(parseFloat(sendCoordinatesResponse?.data.ParameterValue) > 0.6 && parseFloat(sendCoordinatesResponse?.data.ParameterValue) <= 1) &&
                  < Text style={{
                    marginBottom: 10,
                    marginTop: 10,
                    color: GOBALCOLOR.COLORS.GREEN_2,
                    backgroundColor: GOBALCOLOR.COLORS.BLACK,
                    padding: 10,
                    borderRadius: 5,
                    fontSize: 16,
                  }}>No Stress, No action required</Text>}
              </View>
            )}
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => dispatch({ type: SHOW_MODAL, isShowModal: false })}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: GOBALCOLOR.COLORS.BLUE,
                }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* <Modal
                isVisible={isProgressShow}
                animationIn="bounceIn"
                animationOut="bounceOut"
                coverScreen={true}
                hasBackdrop={true}
                animationInTiming={500}
                animationOutTiming={500}
                backdropTransitionInTiming={500}
                backdropTransitionOutTiming={500}
                backdropColor={GOBALCOLOR.COLORS.BROWN}
                backdropOpacity={0.60}
            >
                <View style={{ width: '100%', alignItems: 'center', alignSelf: 'center' }}>
                    <ActivityIndicator size={"large"} color={GOBALCOLOR.COLORS.WHITE} />
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: GOBALCOLOR.COLORS.WHITE, marginTop: 15 }}>Please wait...</Text>
                </View>
            </Modal> */}
        {/* <ProgressScreen /> */}
      </ScrollView>
    </View >
  );
};

export default connect(null, null)(DashboardScreen);
