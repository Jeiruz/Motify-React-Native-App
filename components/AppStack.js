import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import PostDetail from './feed/PostDetail'
import CommentList from './comments/CommentList'
import ShareForm from './feed/ShareForm'
import CommentDetail from './comments/CommentDetail'
import UsersProfile from './users_profile/UsersProfile'
import AppTabs from './AppTabs'
import SearchForm from './search/SearchForm'
import UserLikeList from '../components/user_like_list/UserLikeList'
import ChatSearch from '../components/chat/ChatSearch'
import AddChat from '../components/chat/AddChat'
import SearchResults from './search/SearchResults'
import PostSearch from './search/PostSearch'
import UserSearch from './search/UserSearch'
import NotificationDashboard from './notification/NotificationDashboard'
import NotificationDetail from './notification/NotificationDetail'
import ChatRoom from './chat/ChatRoom'
import ImageDetail from './feed/ImageDetail'
import FollowerList from './profile/FollowerList'
import NotificationTemplate from './notification/NotificationTemplate'
import TermsAndCondition from './settings/TermsAndCondition'
import Logout from './settings/Logout'
import SettingsDashboard from './settings/SettingsDashboard'
import EditDashboard from './edit/EditDashboard'
import ColorPick from './edit/ColorPick'
import ImageList from './profile/ImageList'
import ProfilePick from './edit/ProfilePick'


const Stack = createStackNavigator()


export default function AppStack() {
    return (
        <Stack.Navigator 
        screenOptions={{
            header: () => null,
            cardStyle: {
                backgroundColor: "#1b1a20"
            }
        }}
        >
             
            <Stack.Screen 
                name='Feed' 
                component={AppTabs}
                />
            <Stack.Screen 
                name='Notification' 
                component={NotificationDashboard}
                />
            <Stack.Screen 
                name='NotificationDetail' 
                component={NotificationDetail}
                />
            <Stack.Screen 
                name='NotificationTemplate' 
                component={NotificationTemplate}
                />
            <Stack.Screen 
                name='SearchResults' 
                component={SearchResults}
                />
            <Stack.Screen 
                name='EditDashboard' 
                component={EditDashboard}
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
                name='CommentList' 
                component={CommentList}
                />
            <Stack.Screen 
                name='ColorPick' 
                component={ColorPick}
                />
            <Stack.Screen 
                name='SettingsDashboard' 
                component={SettingsDashboard}
                />
            <Stack.Screen 
                name='TermsAndCondition' 
                component={TermsAndCondition}
                />
            <Stack.Screen 
                name='Logout' 
                component={Logout}
                />
            <Stack.Screen 
                name='ShareForm' 
                component={ShareForm}
                />
            <Stack.Screen 
                name='CommentDetail' 
                component={CommentDetail}
                />
            <Stack.Screen 
                name='UsersProfile' 
                component={UsersProfile}
                />
            <Stack.Screen 
                name='ImageList' 
                component={ImageList}
                />
            <Stack.Screen 
                name='FollowerList' 
                component={FollowerList}
                />
            <Stack.Screen 
                name='SearchForm' 
                component={SearchForm}
                />
            <Stack.Screen 
                name='PostSearch' 
                component={PostSearch}
                />
            <Stack.Screen 
                name='UserSearch' 
                component={UserSearch}
                />
            <Stack.Screen 
                name='ChatRoom' 
                component={ChatRoom}
                />
            <Stack.Screen 
                name='UserLikeList' 
                component={UserLikeList}
                />
            <Stack.Screen 
                name='ChatSearch' 
                component={ChatSearch}
                />
            <Stack.Screen 
                name='AddChat' 
                component={AddChat}
                />
            <Stack.Screen 
                name='ProfilePick' 
                component={ProfilePick}
                />
        </Stack.Navigator> 
    )
}