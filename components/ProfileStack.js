import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileDashboard from './profile/ProfileDashboard'



const Stack = createStackNavigator()


export default function ProfilefStack() {
    return (
        <Stack.Navigator 
        screenOptions={{
            header: () => null
        }}
        >
            <Stack.Screen 
                name='Profile' 
                component={ProfileDashboard}
                />
        </Stack.Navigator> 
    )
}