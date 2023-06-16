import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, BackHandler, TouchableOpacity, Image } from "react-native";
import Animated, {
    useAnimatedStyle,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import GOBALCOLOR from '../../gobalconstant/colors';
import Modal from "react-native-modal";

const ProgressScreen = (props) => {

    const [counter, setCounter] = useState(1);
    const MAX_DOTS = 3;

    useEffect(() => {
        const intervalID = setInterval(() => {
            setCounter((counter % MAX_DOTS) + 1);
        }, 750);
        return () => clearInterval(intervalID);
    }, [counter]);

    const dots = '.'.repeat(counter);
    const spaces = ' '.repeat(MAX_DOTS - counter);

    const glowAnimation = useAnimatedStyle(() => ({
        transform: [
            {
                scale: withRepeat(
                    withSequence(
                        withTiming(1.2, { duration: 1500 }),
                        withTiming(1.6, { duration: 1500 })
                    ),
                    -1,
                    true
                ),
            },
        ],
    }));

    return (
        <Modal
            isVisible={true}
            animationIn="slideInRight"
            animationOut="slideOutLeft"
            swipeDirection="right"
            coverScreen={true}
            hasBackdrop={true}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            propagateSwipe={true}
            backdropColor="black"
            backdropOpacity={0.70}>
            <Animated.View style={[styles.glowContainer, glowAnimation]}>
                <Image
                    source={require('../../assets/agautomate_logo.png')}
                    style={styles.image}
                    resizeMode="center"
                />
                <Text style={{ color: GOBALCOLOR.COLORS.BLUE, fontSize: 10, fontWeight: '700', justifyContent: 'center', alignSelf: 'center' }}>Please wait <Text>{dots + spaces}</Text></Text>
            </Animated.View>

        </Modal>
    )
};

export default ProgressScreen;

const styles = StyleSheet.create({
    glowContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 8,
        bottom: 0,
        left: 0,
        right: 4,
        backgroundColor: GOBALCOLOR.COLORS.WHITE
    },
    image: {
        width: 80,
        height: 80
    }
});
