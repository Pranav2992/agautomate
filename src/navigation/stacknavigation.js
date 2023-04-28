import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//import screens
import Splash from '../screens/splash';
import SignIn from '../screens/signin';
import SignUp from '../screens/signup';
import Profile from '../screens/profile';
import ForgetPassword from '../screens/forgetpassword';
import DashboardScreen from '../screens/dashboard';

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
                component={Splash}
            />
            <Stack.Screen
                options={{
                    headerShown: null
                }}
                name="SignInScreen"
                component={SignIn}
            />
            <Stack.Screen
                options={{
                    headerShown: null
                }}
                name="SignUpScreen"
                component={SignUp}
            />
            <Stack.Screen
                options={{
                    headerShown: null
                }}
                name="ProfileScreen"
                component={Profile}
            />
            <Stack.Screen
                options={{
                    headerShown: null
                }}
                name="ForgetPasswordScreen"
                component={ForgetPassword}
            />
            <Stack.Screen
                options={{
                    headerShown: null
                }}
                name="DashboardScreen"
                component={DashboardScreen}
            />
        </Stack.Navigator>
    );
}

export default StackNavigation;