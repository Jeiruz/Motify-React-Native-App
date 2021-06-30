import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AppTabs from './AppTabs'
import Register from './auth/Register'
import Login from './auth/Login'
import PostDetail from './feed/PostDetail'
import ImageDetail from './feed/ImageDetail'

const Stack = createStackNavigator()


export default function AppStack() {
    return (
        <Stack.Navigator 
        screenOptions={{
            cardStyle: {
                backgroundColor: "#1b1a20"
            },
            header: () => null
        }}
        >
             
            <Stack.Screen 
                name='Feed' 
                component={AppTabs}
                />
            <Stack.Screen 
                name='PostDetail' 
                component={PostDetail}
                />
            <Stack.Screen 
                name='ImageDetail' 
                component={ImageDetail}
                />
            <Stack.Screen 
                name='Register' 
                component={Register}
                />
            <Stack.Screen 
                name='Login' 
                component={Login}
                />
        </Stack.Navigator> 
    )
}