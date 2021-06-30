import React, { Component } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetchToken } from '../../actions/auth'
import axios from 'axios'
import SingleCommentList from './SingleCommentList'
import CommentForm from './CommentForm'
import RandomTemplate from '../shared/RandomTemplate'
import ErrorTemplate from '../shared/ErrorTemplate'
import ErrorMessage from '../shared/ErrorMessage'
import FooterLoading from '../shared/FooterLoading'
import { random_style, baseURL } from '../shared/HelperFunction'
import Loading from '../shared/Loading'
import HeaderView from '../shared/HeaderView'

class CommentDetail extends Component {
    state = {
        data: [],
        loading: true,
        error: false,
        no_more: false

    }
    componentDidMount() {
            this.fetchData()
    }
    fetchData = () => {
        const { comment } = this.props.route.params
        const { token } = this.props
        const { data } = this.state
        axios.get(`${baseURL}/api/comments/replies/?limit=10&offset=${data.length}&id=${comment.id}`,
         fetchToken(token))
            .then(res => {
                this.setState(state => ({ data: [...res.data.replies, ...state.data], loading: false }))
                res.data.replies.length < 10 ? this.setState({ no_more: true }) : null
            }).catch(() => this.setState({ error: true, loading: false})) 
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
        const { comment, slug, number } = this.props.route.params 
        const { error, data, loading, no_more} = this.state
        let sortedArray = data.slice(0);
        const { color } = random_style(number)
        sortedArray.sort(function(a, b) {
            return b.id - a.id 
        })
        return (
            <RandomTemplate number={number} 
                custom_style={{    
                    height: "100%",
                    position: "absolute",
                    width: "100%"
                }}>
                <HeaderView title="Replies" navigation={this.props.navigation} color={color}/>
                {error && data.length !== 0 ? <ErrorMessage/> : null}
                {loading && data.length === 0 ? 
                    <Loading number={number}/>: error && data.length === 0 ? 
                        <View style={{ flex: 1}}> 
                            <ErrorTemplate fetchData={this.fetchData} changeState={this.changeState}/>
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
                            <SingleCommentList comment={item} detail={true} number={number}/>
                        </View>
                    )}
                />}
                <View>
                    <CommentForm id={comment.id} slug={slug} color={color} reply={true} callback={this.commentCallback}/>
                </View>
            </RandomTemplate>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        marginTop: 24,
        height: "100%",
    },
    loadingContainer: {
        flex: 1
    }
})

const mapStateToProps = state => ({
    token: state.auth.token
})

export default connect(mapStateToProps)(CommentDetail)












{/* <RandomTemplate number={number} style={{
                height: "100%",
                position: "absolute",
                width: "100%"
            }}>
                    <SingleCommentDetail comment={comment}/>
                {this.state.loading ? 
                    <View style={styles.loadingContainer}>
                        <Text>
                            Please wait...
                        </Text>
                    </View>
                    :<FlatList
                    data={this.state.data}
                    keyExtractor={(x, i) => `${i}`}
                    initialNumToRender = {10}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <SingleCommentList comment={item} detail={true}/>
                        </View>
                    )}
                />}
            <View>
                <CommentForm id={comment.id} slug={slug} reply={true}/>
            </View>
            </RandomTemplate> */}