import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {IconButton, Drawer, Provider, Menu, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {StackActions, useNavigation} from '@react-navigation/native';

 const Header =(props)=> {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {}, []);

  return (
    <Provider>
      <View style={styles.nav}>
        <View>
          <IconButton icon="account-circle" size={28} iconColor="#333333" />
        </View>

        <Text style={styles.title}>test</Text>
        <TouchableOpacity
         >
          <IconButton icon="logout" size={28} iconColor="#333333"  onPress={() => {
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
          }}/>
        </TouchableOpacity>
      </View>
    </Provider>
  );
}
const styles = StyleSheet.create({
  nav: {
    backgroundColor: 'white',
    height: 65,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10,
    paddingLeft: 10,
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    color: '#3f4c6b',
    fontSize: 22,
    fontWeight: 'bold',
  },
  ProfileIcon: {
    resizeMode: 'center',
    width: 60,
    height: 60,
    // borderRadius: 160,
    alignSelf: 'center',
  },
});
export default Header
