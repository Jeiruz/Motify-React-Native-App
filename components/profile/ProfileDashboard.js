import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { getProfile } from '../../actions/profile'
import ErrorTemplate from '../shared/ErrorTemplate'
import Profile from './Profile'
import Loading from '../shared/Loading'
import { logout } from '../../actions/auth'
import ErrorMessage from '../shared/ErrorMessage'

class ProfileDashBoard extends Component{

    state = {
        loading: true,
        error: false,
    }

    componentDidMount() {
        const { profile } = this.props
        if (profile === null) {
            this.fetchData()
        }
    }

    setErrorandLoading = (type) => {
        if (type === "fetch") {
            this.setState({ loading: false })
        } else if (type === "error") {
            this.setState({
                error: true,
                loading: false
            })
        }
    }

    fetchData = () => {
        this.props.getProfile(this.props.user.username, this.setErrorandLoading)
    }

    changeState = () => {
        this.setState({ error: false, loading: true })
    }

    render() {
        const { loading, error } = this.state
        const { profile, navigation } = this.props
        const styles = StyleSheet.create({
            container: {
                flex: 1,
            },
            item: {
                marginTop: 24,
                height: "100%",
            }
        })

            return (
            <View style={styles.container}>
                {/* <Text onPress={() => this.props.logout()}>Log out</Text> */}
            {error && profile ? <ErrorMessage/> : null}   
            { loading && profile === null ? <Loading/> : error && profile === null ?
            <View style={{ backgroundColor: "#1b1a20", flex: 1}}>
                <ErrorTemplate color={"white"} fetchData={this.fetchData} changeState={this.changeState}/>
            </View> :
            <Profile profile={profile} navigation={navigation}/>
            }
            </View>
            )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    profile: state.profile.profile
})

export default connect(mapStateToProps, { getProfile, logout  })(ProfileDashBoard)