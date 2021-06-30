import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, Ionicons, EvilIcons } from '@expo/vector-icons'
import FeedStack from './FeedStack'
import SearchStack from './SearchStack'
import ProfileStack from './ProfileStack'
import ChatStack from './ChatStack'
import CustomTabBar from './CustomTabBar'
import AddPostStack from './AddPostStack'
import { connect } from 'react-redux'
import Login from './auth/Login'

const Tabs = createBottomTabNavigator()


function AppTabs({ new_user }) {
    return (
        <Tabs.Navigator
            tabBar={props => <CustomTabBar {...props}/>}
        >
            <Tabs.Screen 
                name='Feed' 
                component={FeedStack} 
                initialParams={{ icon: 'home' }}
            />
            <Tabs.Screen 
                name='Search' 
                component={new_user ? Login : SearchStack}
                initialParams={{ icon: 'search' }}
            />
            <Tabs.Screen 
                name='AddPost' 
                component={new_user ? Login : AddPostStack}
                initialParams={{ icon: 'plus-square' }}
            />
             <Tabs.Screen 
                name='ChatStack' 
                component={new_user ? Login : ChatStack}
                initialParams={{ icon: 'mail' }}
                />
            <Tabs.Screen 
                name='Profile' 
                component={new_user ? Login : ProfileStack}
                initialParams={{ icon: 'user' }}
            />
        </Tabs.Navigator>
    )
}

const mapStateToProps = state => ({
    new_user: state.new_user.data
})

export default connect(mapStateToProps)(AppTabs)















































// import React, { useContext } from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { AntDesign, Ionicons, EvilIcons } from '@expo/vector-icons'
// import FeedStack from './FeedStack'
// import SearchStack from './SearchStack'
// import ProfileStack from './ProfileStack'
// import ChatStack from './ChatStack'

// const Tabs = createBottomTabNavigator()



// export default function AppTabs() {
//     return (
//         <Tabs.Navigator
//             screenOptions={({ route }) => ({
//                 tabBarIcon: ({ focused, color, size }) => {
//                     let iconName;

//                     if (route.name === 'Feed') {
//                         iconName = "home";
//                     return <AntDesign name={iconName} size={size} color={color}/>
//                     } else if (route.name === 'Search') {
//                         iconName = 'search';
//                     return <EvilIcons name={iconName} size={size} color={color}/>
//                     } else if (route.name === 'Profile') {
//                         iconName = 'search'
//                     return  <EvilIcons name={iconName} size={size} color={color}/>
//                     } else if (route.name === 'Chat') {
//                         iconName = 'home'
//                     return  <AntDesign name={iconName} size={size} color={color}/>
//                     }
//                     return <Ionicons name={iconName} size={size} color={color}/>
//                 },
//             })}
//             tabBarOptions={{
//                 activeTintColor: "white",
//                 inactiveTintColor: "gray",
//                 style: {
//                     backgroundColor: '#001a35',
//                 }
//             }}
//         >
//             <Tabs.Screen name='Feed' component={FeedStack}/>
//             <Tabs.Screen name='Search' component={SearchStack}/>
//             <Tabs.Screen name='Profile' component={ProfileStack}/>
//             <Tabs.Screen name='ChatStack' component={ChatStack}/>
//         </Tabs.Navigator>
//     )
// }
