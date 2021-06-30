import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TopNavigation from './feed/TopNavigation'

const Stack = createStackNavigator()


export default function FeedStack({ route }) {
    return (
        <Stack.Navigator 
        screenOptions={{
            header: () => null,
        }}
        >
            <Stack.Screen 
                name='Feed' 
                component={TopNavigation}
                />
        </Stack.Navigator> 
    )
}