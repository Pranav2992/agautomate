import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StatusBar, Image } from "react-native";
import styles from '../splash/styles';
import { useFocusEffect } from '@react-navigation/native';
import GOBALCOLORS from '../../gobalconstant/colors';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect, useSelector } from "react-redux";

const SplashScreen = (props) => {

    const { userLogged } = useSelector((state) => state.appReducers)
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        console.log('splash screen use effect called ', userLogged)
        setTimeout(() => {

            AsyncStorage.getItem('isLogged').then((result) => {
                if (result === 'true') {
                    props.navigation.navigate('DashboardScreen');
                } else {
                    props.navigation.navigate('SignInScreen');
                }
            });

        }, 2000);
    }, [userLogged]);

    useFocusEffect(
        useCallback(() => {
            setTimeout(() => {

                AsyncStorage.getItem('isLogged').then((result) => {
                    if (result === 'true') {
                        props.navigation.navigate('DashboardScreen');
                    } else {
                        props.navigation.navigate('SignInScreen');
                    }
                });

            }, 2000);
        }, [userLogged])
    )

    return (
        <View style={styles.mainContainer}>
            <StatusBar opaque animated={true}
                backgroundColor={GOBALCOLORS.COLORS.DARK_BLUE}
                hidden={hidden} />
            {/* <Text style={styles.text}>Ag
                <Text style={styles.text1}>Automate</Text>
            </Text> */}
            <Image source={require('../../assets/AgAutomate.png')} style={{ height: 200 }} resizeMode="center" />
        </View>
    )
};

export default connect(null, null)(SplashScreen);

