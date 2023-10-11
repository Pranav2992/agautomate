import React, {useEffect, useState} from 'react';
import {View, Text, Alert, BackHandler} from 'react-native';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
          {text: 'YES', onPress: () => BackHandler.exitApp()},
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
        <View style={{marginLeft: 20}}>
          <Text style={styles.appBarTitle}>Home</Text>
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
      <View style={styles.mainContainer}>
        <Text
          style={styles.text}
          onPress={() => {
            navigation.navigate('CropList', {comesFrom: 'new'});
          }}>
          Home
        </Text>
      </View>
    </>
  );
};

export default HomeScreen;
