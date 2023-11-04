import React, { useEffect, useState } from 'react';
import { View, Text, Alert, BackHandler, Dimensions, TouchableOpacity } from 'react-native';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GOBALCOLOR, { COLORS } from '../../gobalconstant/colors';
import LottieView from 'lottie-react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const HomeScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        Alert.alert('Hold on!', 'Are you sure you want to exit app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <>
      <View style={styles.appBarContainer}>
        {/* <View style={{flexDirection: 'row', position: 'absolute', left: 5}}>
          <Ionicons
            name="arrow-back"
            size={35}
            style={{margin: 10, color: '#FFF'}}
            onPress={() => goBackScreen()}
          />
        </View> */}
        <View style={{ marginLeft: 20 }}>
          <Text style={styles.appBarTitle}>Home</Text>
        </View>
        <View style={{ flexDirection: 'row', position: 'absolute', right: 0 }}>
          <MaterialIcons
            name="logout"
            size={30}
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
          />
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => props.navigation.navigate('FarmList')} style={{ backgroundColor: COLORS.GREEN_1, borderRadius: 10, margin: 10, width: width / 3, height: width / 3, alignItems: 'center', justifyContent: 'center' }}>
              <LottieView
                visible={true}
                source={require('../../assets/farms.json')}
                style={{
                  width: width / 5,
                  height: width / 5,
                }}
                autoPlay
                loop />
              <Text style={{ color: COLORS.WHITE, fontSize: 16, textAlign: 'center', fontWeight: '500' }}>My Farm List</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('CropList')} style={{ backgroundColor: COLORS.GREEN_1, borderRadius: 10, margin: 10, width: width / 3, height: width / 3, alignItems: 'center', justifyContent: 'center' }}>
              <LottieView
                visible={true}
                source={require('../../assets/crops.json')}
                style={{
                  width: width / 5,
                  height: width / 5,
                }}
                autoPlay
                loop />
              <Text style={{ color: COLORS.WHITE, fontSize: 16, textAlign: 'center', fontWeight: '500' }}>Crop List</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => props.navigation.navigate('DashboardScreen')} style={{ backgroundColor: COLORS.GREEN_1, borderRadius: 10, margin: 10, width: width / 3, height: width / 3, alignItems: 'center', justifyContent: 'center' }}>
              <LottieView
                visible={true}
                source={require('../../assets/report.json')}
                style={{
                  width: width / 5,
                  height: width / 5,
                }}
                autoPlay
                loop />
              <Text style={{ color: COLORS.WHITE, fontSize: 16, textAlign: 'center', fontWeight: '500' }}>My Farm Reports</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('GraphReportScreen')} style={{ backgroundColor: COLORS.GREEN_1, borderRadius: 10, margin: 10, width: width / 3, height: width / 3, alignItems: 'center', justifyContent: 'center' }}>
              <LottieView
                visible={true}
                source={require('../../assets/graphs.json')}
                style={{
                  width: width / 5,
                  height: width / 5,
                }}
                autoPlay
                loop />
              <Text style={{ color: COLORS.WHITE, fontSize: 16, textAlign: 'center', fontWeight: '500' }}>Historical Report</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity /* onPress={() => props.navigation.navigate('DashboardScreen')} */ style={{ backgroundColor: 'gray', borderRadius: 10, margin: 10, width: width / 3, height: width / 3, alignItems: 'center', justifyContent: 'center' }}>
              <LottieView
                visible={true}
                source={require('../../assets/sale.json')}
                style={{
                  width: width / 5,
                  height: width / 5,
                }}
                autoPlay
                loop />
              <Text style={{ color: COLORS.WHITE, fontSize: 16, textAlign: 'center', fontWeight: '500' }}>Sale My Produce</Text>
            </TouchableOpacity>
            <TouchableOpacity /* onPress={() => props.navigation.navigate('GraphReportScreen')} */ style={{ backgroundColor: 'gray', borderRadius: 10, margin: 10, width: width / 3, height: width / 3, alignItems: 'center', justifyContent: 'center' }}>
              <LottieView
                visible={true}
                source={require('../../assets/graphs.json')}
                style={{
                  width: width / 5,
                  height: width / 5,
                }}
                autoPlay
                loop />
              <Text style={{ color: COLORS.WHITE, fontSize: 16, textAlign: 'center', fontWeight: '500' }}>Buy Farm Inputs</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity /* onPress={() => props.navigation.navigate('DashboardScreen')} */ style={{ backgroundColor: 'gray', borderRadius: 10, margin: 10, width: width / 3, height: width / 3, alignItems: 'center', justifyContent: 'center' }}>
              <LottieView
                visible={true}
                source={require('../../assets/finance_ass.json')}
                style={{
                  width: width / 5,
                  height: width / 5,
                }}
                autoPlay
                loop />
              <Text style={{ color: COLORS.WHITE, fontSize: 16, textAlign: 'center', fontWeight: '500' }}>Finance Assistance</Text>
            </TouchableOpacity>
            <TouchableOpacity /* onPress={() => props.navigation.navigate('GraphReportScreen')} */ style={{ backgroundColor: 'gray', borderRadius: 10, margin: 10, width: width / 3, height: width / 3, alignItems: 'center', justifyContent: 'center' }}>
              <LottieView
                visible={true}
                source={require('../../assets/graphs.json')}
                style={{
                  width: width / 5,
                  height: width / 5,
                }}
                autoPlay
                loop />
              <Text style={{ color: COLORS.WHITE, fontSize: 16, textAlign: 'center', fontWeight: '500' }}>{`Equipment\nRentals`}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default HomeScreen;
