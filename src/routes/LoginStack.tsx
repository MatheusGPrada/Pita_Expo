import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { LoginStackParamList } from './typings/login'
import { Login } from '../features/Login/Pages/Login/Login'
import { Platform } from 'react-native'
import { LoginOptions } from '../features/Login/Pages/LoginOptions/LoginOptions'

const { Navigator, Screen } = createStackNavigator<LoginStackParamList>()

export const LoginStack = () => (
    <Navigator
        screenOptions={{
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: 'black',
                elevation: 0,
                height: Platform.OS === 'android' ? 56 : 96,
                shadowOpacity: 0,
            },
            headerTitle: '',
            ...TransitionPresets.SlideFromRightIOS,
        }}
    >
        <Screen component={LoginOptions} name="LoginOptions" options={{ headerShown: false }} />
        <Screen component={Login} name="Login" options={{ headerShown: false }} />
    </Navigator>
)
