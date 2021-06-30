import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import Loading from '../shared/Loading'
import Profile from '../profile/Profile'
import { fetchToken  } from '../../actions/auth'
import axios from 'axios'
import ErrorTemplate from '../shared/ErrorTemplate'
import ErrorMessage from '../shared/ErrorMessage'
import { baseURL } from '../shared/HelperFunction'

function UsersProfile({ route, navigation, token  }) {
    const [state, setState] = useState({
        error: false,
        loading: true,
        profile: null
    })
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        const { username } = route.params
        axios.get(`${baseURL}/api/${username}/`, fetchToken(token))
        .then(res => {
            setState({ loading: false, profile: res.data })
        }).catch(err => setState({ loading: false, error: true}))
    } 


    const changeState = () => {
        setState({ error: false, loading: true })
    }

    const { error, loading, profile } = state

    if (error && profile) {
        setTimeout(() => {
            this.setState({
                error: false
            })
        }, 3000)
    }
    return (
        <View style={{ flex: 1 }}>
            {error && profile ? <ErrorMessage/> : null}   
            { loading && !profile ? <Loading/> : error && !profile ?
            <View style={{ backgroundColor: "#1b1a20", flex: 1}}>
                <ErrorTemplate color={"white"} fetchData={fetchData} changeState={changeState}/>
            </View> :
            <Profile profile={profile} navigation={navigation} other={true}/>
            }
        </View> 
    )
}

const mapStateToProps = state => ({
    token: state.auth.token,
})

export default connect(mapStateToProps)(UsersProfile) 


































// import React, { useEffect } from 'react'
// import { View, Text, FlatList } from 'react-native'
// import { getProfile } from '../../actions/profile'
// import { userPosts } from '../../actions/posts'
// import { connect } from 'react-redux'
// import Post from '../feed/Post'
// import Toggler from '../profile/Toggler'
// import RequestToggler from '../profile/RequestToggler'

// function UsersProfile({ route, profile, posts, getProfile, userPosts, navigation  }) {
//     useEffect(() => {
//         const { username } = route.params
//         getProfile(username)
//         // userPosts(username)
//     }, [])
//     return (
//         <View>
//             { profile ? 
//             <View>
//                 <Text>{profile.username}</Text>
//                 <Toggler user={profile}/>   
//                 <RequestToggler user={profile}/>
//             </View> : <Text>Loading....</Text>}
//         </View> 
//     )
// }

// const mapStateToProps = state => ({
//     profile: state.profile.profile,
//     posts: state.posts.posts,
// })

// export default connect(mapStateToProps, { getProfile, userPosts })(UsersProfile) 