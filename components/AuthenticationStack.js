import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './auth/Login'
import Register from './auth/Register'

const Stack = createStackNavigator()


export default function AuthenticationStack() {
    return (
        <Stack.Navigator 
        initialRouteName='Login'
        screenOptions={{
            header: () => null
        }}
        >
            <Stack.Screen 
                name='Login' 
                component={Login}
                options={{
                    headerTitle: "Sign In"
                }}
                />
            <Stack.Screen 
                name='Register' 
                component={Register} 
                options={{
                headerTitle: "Sign Up"
            }}/>
        </Stack.Navigator> 
    )
}