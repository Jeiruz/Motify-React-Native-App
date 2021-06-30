import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import AuthenticationStack from './AuthenticationStack'
import { NavigationContainer } from '@react-navigation/native'
import AppStack from './AppStack'
import AnonymousStack from './AnonymousStack'

function Container({ auth, new_user }) {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (auth) {
            setLoading(false)
        }
    }, [])
    if (loading) {
        return <View style={styles.container}>
            <Text style={styles.text}>Motify</Text>
        </View>
    } else if (new_user && auth.token === null) {
        return <NavigationContainer>
            <AnonymousStack/>
        </NavigationContainer>
    } else {
        return (
            <NavigationContainer>
                {auth.token ? <AppStack/> : <AuthenticationStack/>}
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#1b1a20",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white"
    }
})

const mapStateToProps = state => ({
    auth: state.auth,
    new_user: state.new_user.data
})

export default connect(mapStateToProps)(Container)