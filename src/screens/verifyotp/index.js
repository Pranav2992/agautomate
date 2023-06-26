import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, BackHandler, TouchableOpacity, Image, } from "react-native";
import styles from "./styles";
import { TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GOBALCOLOR from '../../gobalconstant/colors';
import OTPVerificationController from "../../view-controllers/otpverificationcontroller";
import ProgressScreen from '../highordercomponents/progressscreen';
const VerifyOtp = (props) => {

    const otpRef1 = useRef(null);
    const otpRef2 = useRef(null);
    const otpRef3 = useRef(null);
    const otpRef4 = useRef(null);
    const { activationAccount, otp1, otp2, otp3, otp4, setOtp1, setOtp2, setOtp3, setOtp4, goBackScreen } = OTPVerificationController();

    useEffect(() => {
        /* setStyleObjectVerifyOtp1(styles.inputContainer);
        setStyleObjectVerifyOtp2(styles.inputContainer); */
        console.log("props.route.params.email:", props.route.params.email)
    })

    return (
        <View style={styles.mainContainer}>
            <View style={styles.appBarContainer}>
                <View style={{ flexDirection: 'row', position: 'absolute', left: 5 }}>
                    <Ionicons name="arrow-back" size={35} style={{ margin: 10, color: '#FFF' }} onPress={() => goBackScreen()} />
                </View>
                <View style={{ marginLeft: 70 }}>
                    <Text style={styles.appBarTitle}>Verify OTP</Text>
                </View>
            </View>
            <View style={styles.childContainer}>
                <Text style={styles.lableStyle}>{'Please enter OTP below'}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                    <View style={[styles.inputContainer, { marginTop: 10 }]}>
                        <TextInput
                            ref={otpRef1}
                            mode="flat"
                            label="Mobile Number"
                            style={styles.input}
                            value={otp1}
                            numberOfLines={1}
                            keyboardType="phone-pad"
                            onChangeText={(otp) => {
                                if (otp.toString().charAt(0) === ',' ||
                                    otp.toString().charAt(0) === '-' ||
                                    otp.toString().charAt(0) === '.' ||
                                    otp.toString().charAt(0) === ' ') {
                                    setOtp1(otp.toString().slice(0, -1))
                                } else {
                                    setOtp1(otp);
                                    otpRef2 && otpRef2.current.focus();
                                }
                            }}
                            activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                            underlineColor={GOBALCOLOR.COLORS.BROWN}
                        />
                    </View>
                    <View style={[styles.inputContainer, { marginTop: 10 }]}>
                        <TextInput
                            ref={otpRef2}
                            mode="flat"
                            label="Mobile Number"
                            style={styles.input}
                            value={otp2}
                            keyboardType="phone-pad"
                            onChangeText={(otp) => {
                                if (otp.toString().charAt(0) === ',' ||
                                    otp.toString().charAt(0) === '-' ||
                                    otp.toString().charAt(0) === '.' ||
                                    otp.toString().charAt(0) === ' ') {
                                    setOtp2(otp.toString().slice(0, -1))
                                } else {
                                    setOtp2(otp);
                                    otpRef3 && otpRef3.current.focus();
                                }
                            }}
                            activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                            underlineColor={GOBALCOLOR.COLORS.BROWN}
                        />
                    </View>
                    <View style={[styles.inputContainer, { marginTop: 10 }]}>
                        <TextInput
                            ref={otpRef3}
                            mode="flat"
                            label="Mobile Number"
                            style={styles.input}
                            value={otp3}
                            keyboardType="phone-pad"
                            onChangeText={(otp) => {
                                if (otp.toString().charAt(0) === ',' ||
                                    otp.toString().charAt(0) === '-' ||
                                    otp.toString().charAt(0) === '.' ||
                                    otp.toString().charAt(0) === ' ') {
                                    setOtp3(otp.toString().slice(0, -1))
                                } else {
                                    setOtp3(otp);
                                    otpRef4 && otpRef4.current.focus();
                                }
                            }}
                            activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                            underlineColor={GOBALCOLOR.COLORS.BROWN}
                        />
                    </View>
                    <View style={[styles.inputContainer, { marginTop: 10 }]}>
                        <TextInput
                            ref={otpRef4}
                            mode="flat"
                            label="Mobile Number"
                            style={styles.input}
                            value={otp4}
                            keyboardType="phone-pad"
                            onChangeText={(otp) => {
                                if (otp.toString().charAt(0) === ',' ||
                                    otp.toString().charAt(0) === '-' ||
                                    otp.toString().charAt(0) === '.' ||
                                    otp.toString().charAt(0) === ' ') {
                                    setOtp4(otp.toString().slice(0, -1))
                                } else {
                                    setOtp4(otp)
                                }
                            }}
                            activeUnderlineColor={GOBALCOLOR.COLORS.BROWN}
                            underlineColor={GOBALCOLOR.COLORS.BROWN}
                        />
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => activationAccount({
                    "email": props.route.params.email,
                    "otp": `${otp1}${otp2}${otp3}${otp4}`
                })}>
                    <Text style={styles.buttonText}>OTP Verification</Text>
                </TouchableOpacity>
            </View>
            <ProgressScreen />
        </View>
    )
};

export default VerifyOtp;
