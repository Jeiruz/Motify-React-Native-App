import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchToken } from '../../actions/auth'
import CategoryList from './CategoryList'
import SearchBar from '../search/SearchBar'
import ErrorTemplate from '../shared/ErrorTemplate'
import Loading from '../shared/Loading'
import { categoryPersist } from '../../actions/category'
import { baseURL } from '../shared/HelperFunction'

function Category({ token, navigation, categoryPersist, data }) {

    const [category, setCategory] = useState({
        data: [],
        loading: true,
        error: false
    })

    useEffect(() => {
        if (data.length === 0) {
            fetchData()
        } else if (data.length !== 0) {
            setCategory({
                data,
                loading: false,
                error: false
            })
        }
        
    }, [])
    const fetchData = () => {
        axios.get(`${baseURL}/api/category/filter/`, fetchToken(token))
        .then(res => {
            setCategory({
                data: [
                    ...res.data.meme, 
                    ...res.data.game,
                    ...res.data.awesome, 
                    ...res.data.great, 
                    ...res.data.amazing, 
                    ...res.data.damn, 
                ],
                loading: false,
                error: false
            })
        }).catch(err => setCategory({ 
            data: category.data,
            loading: false,
            error: true
        }))
    }
    const changeState = () => {
        setCategory({
            data: category.data,
            loading: true,
            error: false
        })
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#1b1a20",
        },
        item: {
            marginTop: 13,
            height: "100%",
        },
        text1: {
            color: "white",
            fontWeight: "bold",
            fontSize: 22,
            textAlign: "center",
            
        },
        text2: {
            textAlign: "center",
            color: "white",
            marginTop: 18,
            fontWeight: "bold",
            fontSize: 17,
            height: 30,
            marginLeft: 135,
            marginRight: 135,
            paddingTop: 2.3,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: "white",
        },
        loading: {
            height: "100%",
            backgroundColor: "#1b1a20",
            alignItems: "center",
            marginTop: 300
        }
    })
    if (category.data.length !== 0) {
        categoryPersist(category.data)
    }
    if (category.error === false) {
        return (
            <View style={styles.container}>
            <SearchBar navigation={navigation} type="search"/>
            {category.loading ? <Loading style={styles.loading}/>:        
                <FlatList
                    numColumns={2}
                    data={category.data}
                    keyExtractor={(x, i) => `${i}`}
                    initialNumToRender = {10}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <CategoryList list={item} navigation={navigation}/>
                        </View>
                    )}
                />}
        </View>
        )
    } else if (category.error && category.data.length === 0 ) {
        return (
        <View style={styles.container}>
            <SearchBar navigation={navigation} type="search"/>
            <ErrorTemplate color={"white"} fetchData={fetchData} changeState={changeState}/>
        </View>
        )
    }
}


const mapStateToProps = state => ({
    token: state.auth.token,
    data: state.category.data
})

export default connect(mapStateToProps, { categoryPersist })(Category)