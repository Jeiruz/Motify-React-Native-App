import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Category from './category/Category'




const Stack = createStackNavigator()


export default function SearchStack() {
    return (
        <Stack.Navigator 
        screenOptions={{
            header: () => null
        }}
        >
            <Stack.Screen 
                name='Category' 
                component={Category}
                />
        </Stack.Navigator> 
    )
}