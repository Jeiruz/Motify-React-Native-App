import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AddPostDashboard from './add_post/AddPostDashboard'

const Stack = createStackNavigator()


export default function AppPostStack({ route }) {
    return (
        <Stack.Navigator 
        screenOptions={{
            header: () => null,
        }}
        >
            <Stack.Screen 
                name='AddPostDashboard' 
                component={AddPostDashboard}
                />
        </Stack.Navigator> 
    )
}