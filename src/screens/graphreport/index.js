import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  BackHandler,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {YAxis, XAxis, BarChart} from 'react-native-svg-charts';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioButtonRN from 'radio-buttons-react-native';
import GOBALCOLOR from '../../gobalconstant/colors';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons';
import GraphReportController from '../../view-controllers/graphreportcontroller';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, connect, useDispatch} from 'react-redux';
import ProgressScreen from '../highordercomponents/progressscreen';
import {farmList as getFarmList} from '../../store/actions/apiCallActions';
const width = Dimensions.get('window').width;
import {LineChart} from 'react-native-chart-kit';
import {useEffect} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dropdown} from 'react-native-element-dropdown';
import {useIsFocused} from '@react-navigation/native';

const GraphReportScreen = props => {
  const {isShowModal, isProgressShow} = useSelector(state => state.appReducers);
  const [isFocus, setIsFocus] = useState(false);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState();

  const data1 = [
    {
      xAxisLabel: 'W1',
      yAxisValue: parseFloat(50),
      svg: {fill: '#004B8D'},
    },
    {
      xAxisLabel: 'W2',
      yAxisValue: parseFloat(10),
      svg: {fill: '#004B8D'},
    },
    {
      xAxisLabel: 'W3',
      yAxisValue: parseFloat(40),
      svg: {fill: '#004B8D'},
    },
    {
      xAxisLabel: 'W4',
      yAxisValue: parseFloat(90),
      svg: {fill: '#004B8D'},
    },
  ];

  const horizontalData = ['W1', 'W2', 'W3', 'W4'];
  const fill = 'rgb(134, 65, 244)';
  const contentInset = {top: 20, bottom: 20};
  const dispatch = useDispatch();
  const {getGraphDataResponse, farmList} = useSelector(
    state => state.apiCallReducers,
  );

  const {
    open,
    itemMonths,
    items,
    openMonths,
    options,
    selectedGraphType,
    value,
    valueMonth,
    valueYear,
    accessToken,
    isDrawGraph,
    data,
    labels,
    openFarmList,
    valueFarmList,
    setOpenFarmList,
    setValuefarmList,
    setAccessToken,
    setItemMonths,
    setItems,
    setUserId,
    setGetGraphDataResponse,
    goBackScreen,
    setOpen,
    setOpenMonths,
    setSelectedGraphType,
    setValue,
    setValueMonth,
    checkSelectedMonth,
    getGraphDataFromServer,
  } = GraphReportController();

  useEffect(() => {
    AsyncStorage.getItem('accessToken').then(accessToken => {
      setAccessToken(accessToken);
      dispatch(
        getFarmList({
          authToken: accessToken,
        }),
      );
    });
    AsyncStorage.getItem('userId').then(userId => {
      setUserId(userId);
    });
    console.log(getGraphDataResponse);
    setGetGraphDataResponse(getGraphDataResponse);
  }, [getGraphDataResponse]);

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
            source={require('../../assets/agautomate_logo.png')}
            style={styles.image}
            resizeMode="center"
          />
        }></Spinner>
      <View style={styles.appBarContainer}>
        {/* <View style={{flexDirection: 'row', position: 'absolute', left: 5}}>
          <Ionicons
            name="arrow-back"
            size={35}
            style={{margin: 10, color: '#FFF'}}
            onPress={() => goBackScreen()}
          />
        </View> */}
        <View style={{marginLeft: 20}}>
          <Text style={styles.appBarTitle}>Graphical Report</Text>
        </View>
        <View style={{flexDirection: 'row', position: 'absolute', right: 0}}>
          <MaterialCommunityIcons
            name="logout"
            size={32}
            style={{margin: 10, color: '#FFF'}}
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
                    dispatch({type: 'USER_LOGGED', userLogged: false});
                    navigation.dispatch(StackActions.popToTop());
                  },
                },
              ]);
            }}
          />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        scrollToOverflowEnabled={true}>
        <View style={styles.dropdownContainer}>
          <View style={styles.container}>
            <Text style={[styles.label, isFocus && {color: 'blue'}]}>
              Select Parameter
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
              placeholder="Select Parameter"
              searchPlaceholder="Search..."
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
            />
          </View>
          {/* <View style={[styles.inputContainer, {marginTop: 10}]}>
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
          <View style={styles.container}>
            <Text style={[styles.label, isFocus && {color: 'blue'}]}>
              Select Farm
            </Text>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
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
              onChange={item => {
                setValuefarmList(item.id);
              }}
            />
          </View>
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
              // setItems={setItemMonths}
              onSelectItem={item => {}}
            />
          </View> */}

          <View style={styles.container}>
            <Text style={[styles.label, isFocus && {color: 'blue'}]}>
              Select Month
            </Text>
            <Dropdown
              style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={itemMonths}
              itemTextStyle={{color: '#333333'}}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Month"
              searchPlaceholder="Search..."
              value={valueMonth}
              onChange={item => {
                checkSelectedMonth(item.value);
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
          }}>
          <RadioButtonRN
            data={options}
            boxStyle={styles.boxStyle}
            style={styles.rbBtn}
            initial={1}
            animationTypes={['shake']}
            box={false}
            /* textColor={GOBAL.COLOR.AQUABLUE} */
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
          <TouchableOpacity
            style={{
              backgroundColor: GOBALCOLOR.COLORS.ORANAGE,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: width / 1.5,
              height: 50,
              borderRadius: 10,
            }}
            onPress={() =>
              getGraphDataFromServer({
                authToken: accessToken,
              })
            }>
            <Text style={[{fontSize: width / 25}]}>Draw Graph</Text>
          </TouchableOpacity>
        </View>
        {/*  <View> */}
        {isDrawGraph ? (
          <>
            {selectedGraphType === 'Daily' ? (
              <ScrollView horizontal={true} nestedScrollEnabled>
                <LineChart
                  withHorizontalLabels={true}
                  data={{
                    labels: labels,
                    datasets: data,
                  }}
                  width={600} // from react-native
                  height={300}
                  fromZero={true}
                  /*  yAxisLabel="$"
                                         yAxisSuffix="k" */
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: GOBALCOLOR.COLORS.WHITE,
                    backgroundGradientTo: GOBALCOLOR.COLORS.WHITE,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(231, 135, 111, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForBackgroundLines: {
                      strokeWidth: 1,
                      stroke: '#e3e3e3',
                      strokeDasharray: '0',
                    },
                    propsForLabels: {
                      width: 10,
                      margin: 10,
                      backgroundColor: 'red',
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />
              </ScrollView>
            ) : (
              <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row'}}>
                  {/*  <YAxis
                            data={[50, 10, 40, 95]}
                            contentInset={contentInset}
                            svg={{
                                fill: 'black',
                                fontSize: 10,
                                fontWeight: '700',
                            }}
                            numberOfTicks={10}
                            formatLabel={(value) => `${value}ºC`}
                        /> */}
                  <View
                    style={{width: 1, backgroundColor: '#000', marginLeft: 5}}
                  />
                  <BarChart
                    style={{height: 200, marginTop: 10}}
                    spacingInner={0.5}
                    bandwidth={2}
                    data={data1}
                    showValuesOnTopOfBars={true}
                    yAccessor={({item}) => item.yAxisValue}
                    xAccessor={({item}) => item.xAxisLabel}
                    yMin={0}
                    svg={{fill}}
                    contentInset={{contentInset}}></BarChart>
                </View>
                <View style={{height: 1, backgroundColor: '#000'}} />
                <XAxis
                  style={{marginTop: 5}}
                  svg={{
                    fill: '#000',
                    fontSize: 12,
                    fontWeight: '500',
                  }}
                  data={horizontalData}
                  spacingInner={0}
                  contentInset={{left: 55, right: 45}}
                  formatLabel={(value, index) => horizontalData[index]}
                  labelStyle={{color: '#000'}}
                />
              </View>
            )}
          </>
        ) : (
          <View></View>
        )}

        {/*  </View> */}
      </ScrollView>
      {/* <ProgressScreen /> */}
    </View>
  );
};

export default connect(null, null)(GraphReportScreen);
