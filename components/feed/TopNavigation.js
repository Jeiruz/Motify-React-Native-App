import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ForYouDashboard from './ForYouDashboard'
import LocalDashboard from './LocalDashboard'
import CustomTopNavigation from './CustomTopNavigation'
import { connect } from 'react-redux'
import Login from '../auth/Login'

const Tab = createMaterialTopTabNavigator();

function TopNavigation({ new_user }) {
    return (
        <Tab.Navigator
            tabBar={props => <CustomTopNavigation {...props}/>}
            sceneContainerStyle={{
                backgroundColor: "#1b1a20"
            }}
        >
            <Tab.Screen name="For You" component={ForYouDashboard}/>
            <Tab.Screen name="Following" component={new_user ? Login : LocalDashboard}/>
        </Tab.Navigator>
    )
}

const mapStateToProps = state => ({
    new_user: state.new_user.data
})

export default connect(mapStateToProps)(TopNavigation)