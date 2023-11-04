import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import styles from '../splash/styles';
import { useFocusEffect } from '@react-navigation/native';
import GOBALCOLORS from '../../gobalconstant/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect, useSelector } from 'react-redux';

const SplashScreen = props => {
  const { userLogged } = useSelector(state => state.appReducers);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    console.log('splash screen use effect called ', userLogged);
    setTimeout(() => {
      AsyncStorage.getItem('isLogged').then(result => {
        if (result === 'true') {
          props.navigation.navigate('HomeScreen');
        } else {
          props.navigation.navigate('SignInScreen');
        }
      });
    }, 2000);
  }, []);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        AsyncStorage.getItem('isLogged').then(result => {
          if (result === 'true') {
            props.navigation.navigate('HomeScreen');
          } else {
            props.navigation.navigate('SignInScreen');
          }
        });
      }, 2000);
    }, [userLogged]),
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        opaque
        animated={true}
        backgroundColor={GOBALCOLORS.COLORS.DARK_BLUE}
        hidden={hidden}
      />
      {/* <Text style={styles.text}>Ag
                <Text style={styles.text1}>Automate</Text>
            </Text> */}
      <Image
        source={require('../../assets/agvision_logo.png')}
        style={{ height: 200, width: 200 }}
        resizeMode="center"
      />
      <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, color: GOBALCOLORS.COLORS.WHITE, fontWeight: "bold" }}>A product by</Text>
        <Image
          source={require('../../assets/AgAutomate.png')}
          style={{ height: 70, width: 70 }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default connect(null, null)(SplashScreen);
