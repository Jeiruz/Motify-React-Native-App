import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ChatDashboard from './chat/ChatDashboard'
import ChatHeader from './chat/ChatHeader'



const Stack = createStackNavigator()


export default function ChatStack({ navigation }) {
    return (
        <Stack.Navigator 
        screenOptions={{
            header:() => <ChatHeader navigation={navigation}/>
        }}
        >
            <Stack.Screen 
                name='Chat' 
                component={ChatDashboard}
                options={{
                    headerTitle: "ChatDashboard"
                }}
                />
        </Stack.Navigator> 
    )
}