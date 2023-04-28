import React, { useEffect, useState } from "react";
import { View, Text, StatusBar } from "react-native";
import styles from '../splash/styles';
import GOBALCOLORS from '../../gobalconstant/colors';

const SplashScreen = (props) => {

    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            props.navigation.navigate('SignInScreen');
        }, 2000);
    }, []);

    return (
        <View style={styles.mainContainer}>
            <StatusBar opaque animated={true}
                backgroundColor={GOBALCOLORS.COLORS.DARK_BLUE}
                hidden={hidden} />
            <Text style={styles.text}>Ag
                <Text style={styles.text1}>Automate</Text>
            </Text>
        </View>
    )
};

export default SplashScreen;

