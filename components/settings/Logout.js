import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native' 
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'
import Loading from '../shared/Loading'

function Logout({ logout, navigation, route }) {
    const [state, setState] = useState({
        loading: false,
    })
    const { color, background_color, third_color } = route.params.profile
    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: background_color,
            flex: 1
        },
        text: {
            color,
            fontSize: 22
        },
        view1: {
            flexDirection: "row",
            display: "flex",
            marginTop: 10
        },
        text2: {
            color,
            marginTop: 18,
            fontSize: 17,
            height: 30,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: color,
            width: 120,
            height: 30,
            textAlign: "center",
            marginLeft: 20,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 2
        }
    })
    if (state.loading) {
        return <Loading/>
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Are you sure you want</Text>
            <Text style={styles.text}>to logout?</Text>
            <View style={styles.view1}>
                <TouchableOpacity onPress={() => {
                    logout();
                    setState({
                        loading: true
                    })
                }}>
                    <Text style={styles.text2}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.text2}>No</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default connect(null, { logout })(Logout)
