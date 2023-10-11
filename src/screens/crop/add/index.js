// let result = await NETWORK(ENDPOINT.LOGIN, 'POST', data);
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextInput, RadioButton, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import AddFarmController from '../../../view-controllers/addfarmcontroller';
import GOBALCOLOR from '../../../gobalconstant/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {farmList as getFarmList} from '../../../store/actions/apiCallActions';
import {Dropdown} from 'react-native-element-dropdown';
import DashboardController from '../../../view-controllers/dashboardcontroller';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment/moment';
import validationSchema from './formValidation';
import CropController from '../../../view-controllers/cropController';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import styles from './styles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const AddCrop = props => {
  const dispatch = useDispatch();
  const {
    setUserId,
    checkCoordinateClockWise,
    userId,
    openFarmList,
    valueFarmList,
    setOpenFarmList,
    setValuefarmList,
  } = DashboardController();
  // const {setAccessToken} = AddFarmController();
  const {addCropDetail, Crop_List,goBackScreen} = CropController();
  const [initialValues, setInitialValues] = useState({});
  const [accessToken, setAccessToken] = useState('');

  const [state, setState] = useState({
    email: '',
    emailError: '',
    password: '',
  });
  const [isLoad, setIsLoad] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const {farmList} = useSelector(state => state.apiCallReducers);
  const {cropList} = useSelector(state => state.apiCallReducers);

  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('accessToken').then(accessToken => {
      console.log('asdas', accessToken);
      setAccessToken(accessToken);
      dispatch(
        getFarmList({
          authToken: accessToken,
        }),
        Crop_List({
          authToken: accessToken,
        }),
      );
    });
    // AsyncStorage.getItem('accessToken').then(accessToken => {
    //   setAccessToken(accessToken);
    // });
    // setInitialValues({
    //   FarmId: '',
    //   CropId: '',
    // });
    setIsLoad(true);
  }, []);

  const {isShowModal, isProgressShow} = useSelector(state => state.appReducers);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setSelectedDate(moment(currentDate).format('YYYY-MM-DD HH:mm:ss').toString());
    console.log(typeof currentDate.toString());
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  return (
    // <View style={styles.mainContainer}>
    //   <Text style={{color: 'black', margin: 20, fontSize: 20}}>
    //     Add Crop Details
    //   </Text>
    //   {isLoad && (
    //     <View
    //       style={{
    //         alignItems: 'center',
    //         margin: 10,
    //         height: '100%',
    //       }}>
    //       <View style={styles.container}>
    //         <Text style={[styles.label, isFocus && {color: 'blue'}]}>
    //           Select Farm
    //         </Text>
    //         <Dropdown
    //           style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
    //           placeholderStyle={styles.placeholderStyle}
    //           selectedTextStyle={styles.selectedTextStyle}
    //           inputSearchStyle={styles.inputSearchStyle}
    //           iconStyle={styles.iconStyle}
    //           data={farmList}
    //           itemTextStyle={{color: '#333333'}}
    //           search
    //           maxHeight={300}
    //           labelField="FarmName"
    //           valueField="id"
    //           placeholder="Select Farm"
    //           searchPlaceholder="Search..."
    //           value={valueFarmList}
    //           onChange={item => {
    //             setValuefarmList(item.id);
    //           }}
    //         />
    //       </View>
    //       <View style={styles.container}>
    //         <Text style={[styles.label, isFocus && {color: 'blue'}]}>
    //           Select Crop
    //         </Text>
    //         <Dropdown
    //           style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
    //           placeholderStyle={styles.placeholderStyle}
    //           selectedTextStyle={styles.selectedTextStyle}
    //           inputSearchStyle={styles.inputSearchStyle}
    //           iconStyle={styles.iconStyle}
    //           data={farmList}
    //           itemTextStyle={{color: '#333333'}}
    //           search
    //           maxHeight={300}
    //           labelField="FarmName"
    //           valueField="id"
    //           placeholder="Select Crop"
    //           searchPlaceholder="Search..."
    //           value={valueFarmList}
    //           onChange={item => {
    //             setValuefarmList(item.id);
    //           }}
    //         />
    //       </View>
    //       <View style={styles.inputContainer}>
    //         {/* <Text style={[styles.label, isFocus && {color: 'blue'}]}>
    //           Select Crop
    //         </Text> */}
    //         <TextInput
    //           style={styles.input}
    //           value={selectedDate}
    //           label="Showing Date"
    //           underlineColor="grey"
    //           right={
    //             <TextInput.Icon
    //               icon="calendar-month-outline"
    //               onPress={showDatepicker}
    //             />
    //           }
    //         />
    //       </View>
    //       {/* <Text>{selectedDate}</Text> */}
    //       {show && (
    //         <RNDateTimePicker
    //           testID="dateTimePicker"
    //           timeZoneOffsetInMinutes={0}
    //           value={date}
    //           mode={mode}
    //           is24Hour={true}
    //           display="default"
    //           onChange={onChange}
    //         />
    //       )}
    //     </View>
    //   )}
    // </View>
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
            source={require('../../../assets/agautomate_logo.png')}
            style={styles.image}
            resizeMode="center"
          />
        }></Spinner>
      <View style={styles.appBarContainer}>
        <View style={{flexDirection: 'row', position: 'absolute', left: 5}}>
          <Ionicons
            name="arrow-back"
            size={35}
            style={{margin: 10, color: '#FFF'}}
            onPress={() => goBackScreen()}
          />
        </View>
        <View style={{marginLeft: 70}}>
          <Text style={styles.appBarTitle}>
            {/* {props.route.params.comesFrom === 'new'
              ? `Add Crop Details`
              : `Edit Farm Details`} */}
            Add Crop Details
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
                  <View style={styles.container}>
                    <Text style={[styles.label, isFocus && {color: 'blue'}]}>
                      Select Farm
                    </Text>
                    <Dropdown
                      style={[
                        styles.dropdown,
                        isFocus && {borderColor: 'blue'},
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={farmList}
                      itemTextStyle={{color: '#333333'}}
                      search
                      maxHeight={300}
                      labelField="FarmName"
                      valueField="id"
                      placeholder="Select Farm"
                      searchPlaceholder="Search..."
                      value={valueFarmList}
                      // value={values.FarmId}
                      onChange={item => {
                        setValuefarmList(item.id);
                      }}
                    />
                  </View>

                  <View style={styles.container}>
                    <Text style={[styles.label, isFocus && {color: 'blue'}]}>
                      Select Crop
                    </Text>
                    <Dropdown
                      style={[
                        styles.dropdown,
                        isFocus && {borderColor: 'blue'},
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={cropList}
                      itemTextStyle={{color: '#333333'}}
                      search
                      maxHeight={300}
                      labelField="CropName"
                      valueField="id"
                      placeholder="Select Crop"
                      searchPlaceholder="Search..."
                      value={selectedCrop}
                      onChange={item => {
                        setSelectedCrop(item.id);
                      }}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={selectedDate}
                      label="Showing Date"
                      underlineColor="grey"
                      right={
                        <TextInput.Icon
                          icon="calendar-month-outline"
                          onPress={showDatepicker}
                        />
                      }
                    />
                  </View>

                  {show && (
                    <RNDateTimePicker
                      testID="dateTimePicker"
                      timeZoneOffsetInMinutes={0}
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      display="default"
                      onChange={onChange}
                    />
                  )}
                </View>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  // disabled={!isValid || !values.FarmId || !values.CropId}
                  onPress={
                    () =>
                      // props.route.params.comesFrom == 'new'
                      //   ?
                      addCropDetail({
                        FarmId: valueFarmList,
                        CropId: selectedCrop,
                        SowingDate: selectedDate,
                        authToken: accessToken,
                      })
                    // : updateFarmerFarm({
                    //     id: parseInt(props.route.params.selectedFarm.id),
                    //     FarmName: values.farmName,
                    //     FarmerName: values.farmerName,
                    //     authToken: accessToken,
                    //     Coordinate:
                    //       checked === true
                    //         ? `${values.latitudeCoordiante1},${values.longitudeCoordiante1},${values.latitudeCoordiante2},${values.longitudeCoordiante2},${values.latitudeCoordiante3},${values.longitudeCoordiante3},${values.latitudeCoordiante4},${values.longitudeCoordiante4},${values.latitudeCoordiante5},${values.longitudeCoordiante5}`
                    //         : '',
                    //   })
                  }>
                  <Text style={styles.buttonText}>
                    Add Crop
                    {/* {props.route.params.comesFrom === 'new'
                      ? `Add Farm`
                      : `Edit Farm`} */}
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

export default AddCrop;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: GOBALCOLOR.COLORS.WHITE,
//   },
//   appBarContainer: {
//     height: 60,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: GOBALCOLOR.COLORS.BLUE,
//     justifyContent: 'space-between',
//   },
//   appBarTitle: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     color: GOBALCOLOR.COLORS.WHITE,
//   },
//   dropdownContainer: {
//     margin: 10,
//   },
//   mapBtn: {
//     position: 'absolute', //use absolute position to show button on top of the map
//     top: '91%', //for center align
//     right: '3%',
//     alignSelf: 'flex-end', //for align to right
//     backgroundColor: GOBALCOLOR.COLORS.BROWN,
//     padding: 10,
//     borderRadius: 10,
//     shadowColor: GOBALCOLOR.COLORS.BLACK,
//     shadowOffset: {width: 1, height: 1},
//     shadowOpacity: 0.2,
//     elevation: 7,
//   },
//   maBtnText: {
//     color: GOBALCOLOR.COLORS.WHITE,
//     fontSize: 11,
//     fontWeight: 'bold',
//   },
//   backgroundVideo: {
//     width: 400,
//     height: 200,
//     justifyContent: 'center',
//     alignSelf: 'center',
//   },
//   inputContainer: {
//     borderRadius: 7,
//     // borderColor: GOBALCOLOR.COLORS.BROWN,
//     height: 60,
//     overflow: 'hidden',
//     borderWidth: 0,
//     marginTop: 0,
//     width: '100%',
//     backgroundColor: GOBALCOLOR.COLORS.WHITE,
//   },
//   input: {
//     borderRadius: 7,
//     // borderTopLeftRadius: 0,
//     // borderTopRightRadius: 0,
//     height: 55,
//     //overflow: 'hidden',
//     backgroundColor: GOBALCOLOR.COLORS.WHITE,
//     borderColor: 'gray',
//     borderWidth: 0,
//   },
//   inputDropdown: {
//     borderTopWidth: 0,
//     borderLeftWidth: 0,
//     borderRightWidth: 0,
//     borderRadius: 0,
//     borderTopLeftRadius: 0,
//     borderTopRightRadius: 0,
//     height: 55,
//     borderColor: GOBALCOLOR.COLORS.BROWN,
//     backgroundColor: GOBALCOLOR.COLORS.BROWN_LIGHT,
//   },
//   buttonStyle: {
//     backgroundColor: GOBALCOLOR.COLORS.GREEN_2,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 25,
//     height: 50,
//     width: width / 1.1,
//     borderRadius: 10,
//     shadowColor: GOBALCOLOR.COLORS.GREEN_2,
//     shadowOffset: {width: 1, height: 1},
//     shadowOpacity: 0.2,
//     elevation: 7,
//   },
//   buttonText: {
//     color: GOBALCOLOR.COLORS.WHITE,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   spinnerTextStyle: {
//     width: 250,
//     textAlign: 'center',
//   },
//   image: {
//     width: 80,
//     height: 80,
//   },
//   container: {
//     backgroundColor: 'white',
//     paddingVertical: 16,
//     width: '100%',
//   },
//   dropdown: {
//     height: 50,
//     borderColor: 'gray',
//     borderWidth: 0.5,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//   },
//   icon: {
//     marginRight: 5,
//   },
//   label: {
//     position: 'absolute',
//     backgroundColor: 'white',
//     left: 8,
//     top: 8,
//     zIndex: 999,
//     paddingHorizontal: 8,
//     fontSize: 14,
//     color: 'black',
//   },
//   placeholderStyle: {
//     fontSize: 16,
//     color: 'black',
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//     color: 'black',
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//     color: 'black',
//   },
//   datePickerStyle: {
//     width: 200,
//     marginTop: 20,
//   },
// });
