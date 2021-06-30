import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchToken } from '../../actions/auth'
import PostDetail from '../feed/PostDetail'
import Loading from '../shared/Loading'
import { baseURL } from '../shared/HelperFunction'

function NotificationDetail({ route, token, navigation }) {
    const number = Math.floor(Math.random() * 10)
    const [data, setData] = useState({
        post: {},
        loading: true
    })
    const { slug, backgroundColor } = route.params
    useEffect(() => {
        getPost()
    }, [])

    const getPost = () => {
        axios.get(`${baseURL}/api/post/${slug}/detail/`, fetchToken(token))
            .then(res => {
                setData({
                    post: res.data,
                    loading: false
                })
            }).catch(err => console.log(err))
    }

    if (!data.loading) {
        return (
            <PostDetail route={{ params: { post: data.post, number }}}/>
        )
    } else if (data.loading) {
        return <Loading backgroundColor={backgroundColor}/>
    }
}



const mapStateToProps = (state) => ({
    token: state.auth.token,
})

export default connect(mapStateToProps)(NotificationDetail)
