import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import { fetchToken } from '../../actions/auth'
import { random_style, baseURL } from '../shared/HelperFunction'
import Loading from '../shared/Loading'
import FooterLoading from '../shared/FooterLoading'
import HeaderView from '../shared/HeaderView'
import ErrorTemplate from '../shared/ErrorTemplate'

class UserLikeList extends Component {
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
        const { data } = this.state
        const { id } = this.props.route.params
        const { token } = this.props
        axios.get(`${baseURL}/api/post/like-list/?limit=10&offset=${data.length}&post=${id}`, fetchToken(token))
            .then(res => {
                this.setState(state => ({ data: [...res.data.likes, ...state.data], loading: false }))
                res.data.likes < 10 ? this.setState({ no_more: true }) : null
            }).catch(err => this.setState({ error: true, loading: false })) 
    }


    render() {
        const { data, loading, error, no_more } = this.state
        const { number } = this.props.route.params
        const { color, backgroundColor } = random_style(number)
        const { navigation } = this.props
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                height: "100%",
                position: "absolute",
                width: "100%",
                backgroundColor,
            },
            item: {
                marginTop: 15,
                height: "100%",
            },
            image: {
                width: 165,
                height: 225,
            },
            container1: {
                marginLeft: 15
            },
            textStyle2: {
                marginTop: 3,
                fontSize: 11.3,
                color
            },
            loading: {
                height: "100%",
                backgroundColor,
                alignItems: "center",
                marginTop: 300
            },
            loading: {
                height: "100%",
                backgroundColor,
                alignItems: "center",
                justifyContent: "center",
            }
        })
        return (
            <View style={styles.container}>
                {loading ? null : <HeaderView navigation={navigation} color={color} title={"Likes"}/>}
                {loading ? <Loading style={styles.loading}/> : error ? 
                <View style={{ backgroundColor, flex: 1}}>
                    <ErrorTemplate color={color} fetchData={this.fetchData} changeState={this.changeState}/>
                </View>
                :<FlatList
                    numColumns={2}
                    data={data}
                    keyExtractor={(x, i) => `${i}`}
                    initialNumToRender = {10}
                    onEndReached={() => no_more ? null : this.fetchData()}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={() => data.length === 0 ? null : <FooterLoading color={color} text={no_more ? "no more results" : null }/>}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <TouchableOpacity onPress={() => navigation.navigate("UsersProfile", { username: item.username})}>
                                <View style={styles.container1}>
                                {item.image ? <Image style={styles.image} source={{ uri: `${baseURL}${item.image}` }}/> 
                                : <View></View>}
                                <Text style={styles.textStyle2}>{item.username}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.token
})

export default connect(mapStateToProps)(UserLikeList)