import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//import screens
import SplashScreen from '../screens/splash';
import SignInScreen from '../screens/signin';
import SignUpScreen from '../screens/signup';
import ProfileScreen from '../screens/profile';
import ForgetPasswordScreen from '../screens/forgetpassword';
import DashboardScreen from '../screens/dashboard';
import VerifyOtpScreen from '../screens/verifyotp';
import GraphReportScreen from '../screens/graphreport';

const Stack = createStackNavigator();

const horizontalAnimation = {
    gestureDirection: 'horizontal',
    cardStyleInterpolator: ({ current, layouts }) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        }),
                    },
                ],
            },
        };
    },
};

const StackNavigation = (props) => {
    return (
        <Stack.Navigator
            screenOptions={horizontalAnimation}>
            <Stack.Screen
                options={{
                    headerShown: null
                }}
                name="SplashScreen"
                component={SplashScreen}
            />
            <Stack.Screen
                options={{
                    headerShown: null
                }}
                name="SignInScreen"
                component={SignInScreen}
            />
            <Stack.Screen
                options={{
                    headerShown: null
                }}
                name="SignUpScreen"
                component={SignUpScreen}
            />
            <Stack.Screen
                options={{
                    headerShown: null
                }}
                name="ProfileScreen"
                component={ProfileScreen}
            />
            <Stack.Screen
                options={{
                    headerShown: null
                }}
                name="ForgetPasswordScreen"
                component={ForgetPasswordScreen}
            />
            <Stack.Screen
                options={{
                    headerShown: null
                }}
                name="DashboardScreen"
                component={DashboardScreen}
            />
            <Stack.Screen
                options={{
                    headerShown: null
                }}
                name="VerifyOtpScreen"
                component={VerifyOtpScreen}
            />
            <Stack.Screen
                options={{
                    headerShown: null
                }}
                name="GraphReportScreen"
                component={GraphReportScreen}
            />
        </Stack.Navigator>
    );
}

export default StackNavigation;