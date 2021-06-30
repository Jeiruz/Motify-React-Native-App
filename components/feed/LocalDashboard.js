import React, { Component } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetchToken } from '../../actions/auth'
import axios from 'axios'
import Post from './Post'
import ErrorTemplate from '../shared/ErrorTemplate'
import ErrorMessage from '../shared/ErrorMessage'
import Loading from '../shared/Loading'
import FooterLoading from '../shared/FooterLoading'
import { localFeed } from '../../actions/feed'
import { baseURL } from '../shared/HelperFunction'
import NoFollowingYet from './NoFollowingYet'

class LocalDashboard extends Component{
    state = {
        data: [],
        loading: true,
        error: false,
        no_more: false,
        empty: false,
        isFetching: false
    }
    componentDidMount() {
        const { data, } = this.props
        if (data.length === 0) {
            this.fetchData()
        } else if (data.length !== 0) {
            this.setState({
                data,
            })
        } else if (data.length > 200) {
            this.fetchData()
        }
    }


    fetchData = () => {
        const { data } = this.state
        axios.get(`${baseURL}/api/post/user_feed/?limit=10&offset=${data.length}`, fetchToken(this.props.token))
            .then(res => {
                this.setState(state => ({ data: [...res.data.posts, ...state.data], loading: false  }))
                res.data.posts.length < 10 ? this.setState({ no_more: true }) : null
                res.data.posts.length === 0 ? this.setState({ empty: true }) : null
            }).catch(err => this.setState({ error: true, loading: false }))
    }

    refreshedData = () => {
        axios.get(`${baseURL}/api/post/user_feed/?limit=10&offset=0`, fetchToken(this.props.token))
            .then(res => {
                this.setState(state => ({ 
                    data: [...res.data.snippets], 
                    loading: false,
                    isFetching: false 
                 }))
            }).catch(err => this.setState({ error: true, loading: false }))
    }

    onRefresh = () => {
        this.setState({ isFetching: true }, () => { this.refreshedData()})
    }

    changeState = () => {
        this.setState({ error: false, loading: true })
    }
    render() {
        const { loading, data, error, no_more, empty, isFetching } = this.state
        let sortedArray = data.slice(0);
        sortedArray.sort(function(a, b) {
            return b.id - a.id 
        })
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: "#1b1a20",
            },
            item: {
                height: "100%",
            }
        })
        if (error && data.length !== 0) {
            setTimeout(() => {
                this.setState({
                    error: false
                })
            }, 5000)
        }
        if (data.length !== 0) {
            this.props.localFeed(data)
        }
        if (empty && data.length === 0) {
            return (
                <NoFollowingYet token={this.props.token} navigation={this.props.navigation}/>
            )
        }
        return (
            <View style={styles.container}> 
            {error && data.length !== 0 ? <ErrorMessage/> : null}    
            {loading && data.length === 0 ? <Loading/> : error && data.length === 0 ? 
            <View style={{ backgroundColor: "#1b1a20", flex: 1}}>
                <ErrorTemplate color={"white"} fetchData={this.fetchData} changeState={this.changeState}/>
            </View>
            : <FlatList
                data={sortedArray}
                keyExtractor={(x, i) => `${i}`}
                initialNumToRender = {10}
                onRefresh={this.onRefresh}
                refreshing={isFetching}
                onEndReached={() => no_more ? null : this.fetchData()}
                ListFooterComponent={() => <FooterLoading text={no_more ? "no more post" : null }/>}
                onEndReachedThreshold={0.1}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Post post={item} navigation={this.props.navigation}/>
                    </View>
                )}
            />}
            </View>
        )

    }
}




const mapStateToProps = (state) => ({
    token: state.auth.token,
    data: state.local_feed.data
})

export default connect(mapStateToProps, { localFeed })(LocalDashboard)

