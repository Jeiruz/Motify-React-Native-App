import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetchToken } from '../../actions/auth'
import axios from 'axios'
import CommentForm from './CommentForm'
import SingleCommentList from './SingleCommentList'
import ErrorTemplate from '../shared/ErrorTemplate'
import ErrorMessage from '../shared/ErrorMessage'
import RandomTemplate from '../shared/RandomTemplate'
import { random_style, baseURL } from '../shared/HelperFunction'
import FooterLoading from '../shared/FooterLoading'
import Loading from '../shared/Loading'
import HeaderView from '../shared/HeaderView'


class CommentList extends Component {
    state = {
        data: [],
        loading: true,
        error: false,
        no_more: false,
    }
    componentDidMount() {
            this.fetchData()
    }
    fetchData = () => {
        const { post } = this.props.route.params
        const { token } = this.props
        const { data } = this.state
        axios.get(`${baseURL}/api/comments/list/?limit=10&offset=${data.length}&id=${post.id}`,
         fetchToken(token))
            .then(res => {
                this.setState(state => ({ data: [...res.data.comments, ...state.data], loading: false }))
                res.data.comments.length < 10 ? this.setState({ no_more: true }) : null
            }).catch(() => this.setState({ error: true, loading: false})) 
    }

    changeState = () => {
        this.setState({ error: false, loading: true })
    }

    commentCallback = (type, data) => {
        if (type === "fetch") {
            this.setState({
                data: [...this.state.data, data],
                error: false
            })
        } else if (type === "error") {
            this.setState({
                error: true
            })
        }
    }

    render() {
        const { post, number } = this.props.route.params
        const { error, data, loading, no_more } = this.state
        const { navigation } = this.props
        const { color } = random_style(number)
        let sortedArray = data.slice(0);
        sortedArray.sort(function(a, b) {
            return b.id - a.id 
        })
        const styles = StyleSheet.create({
            item: {
                marginTop: 24,
                height: "100%",
            },
            loadingContainer: {
                flex: 1
            },
            text: {
                color,
                fontSize: 22,
            }
        })
        if (error && data.length !== 0) {
            setTimeout(() => {
                this.setState({
                    error: false
                })
            }, 3000)
        }
        if (post.comment_count === 0 && data.length === 0 && !error && !loading) {
            return <RandomTemplate number={number} custom_style={{ flex: 1}}>
                <HeaderView color={color} title={"Comments"} navigation={navigation}/>
                <View style={{ justifyContent: "center", alignItems: "center", flex: 1}}>
                    <Text style={styles.text}>There are no comments yet,</Text>
                    <Text style={styles.text}>add something.</Text>
                </View>
                <View>
                    <CommentForm slug={post.slug} color={color} callback={this.commentCallback}/>
                </View>
            </RandomTemplate>
        }
            return (
                <RandomTemplate number={number} 
                custom_style={{    
                    height: "100%",
                    position: "absolute",
                    width: "100%"
                }}>
                {loading ? null : <HeaderView color={color} title={"Comments"} navigation={navigation}/>}
                {error && data.length !== 0 ? <ErrorMessage/> : null}
                {loading && data.length === 0 ? 
                    <Loading number={number}/>: error && data.length === 0 ? 
                        <View style={{ flex: 1}}> 
                            <ErrorTemplate color={color} fetchData={this.fetchData} changeState={this.changeState}/>
                        </View>
                    :
                    <FlatList
                    data={sortedArray}
                    initialNumToRender = {10}
                    keyExtractor={(x, i) => `${i}`}
                    onEndReached={() => no_more ? null : this.fetchData()}
                    ListFooterComponent={() => <FooterLoading color={color} text={no_more ? "no more comments" : null}/>}
                    onEndReachedThreshold={0.1}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <SingleCommentList comment={item} slug={post.slug} navigation={navigation}  number={number}/>
                        </View>
                    )}
                />}
                { loading && data.length === 0 ? null : <View>
                    <CommentForm slug={post.slug} color={color} callback={this.commentCallback}/>
                </View> }
            </RandomTemplate>
            )

    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
})

export default connect(mapStateToProps)(CommentList)