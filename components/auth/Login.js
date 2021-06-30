import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import FlatButton from '../shared/FlatButton'
import * as yup from 'yup'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { styles } from './Styles'
import Loading from '../shared/Loading'
import ErrorMessage from '../shared/ErrorMessage'
import { newUser } from '../../actions/new'

const authSchema = yup.object({
    email: yup.string().required().min(4),
    password: yup.string().required().min(8),
})


const Login = ({ navigation, login, newUser }) => {
    const [state, setState] = useState({
        loading: false,
        error: false
    })
    const callback = (type) => {
        if (type === "fetch") {
            setState({
                loading: false
            })
        } else if (type === "error") {
            setState({
                loading: false,
                error: true
            })
        }   
    }
    const { loading, error } = state
    if (error) {
        setTimeout(() => {
            setState({
                error: false
            })
        }, 5000)
    }
    if (loading) {
        return <Loading/>
    }
    return(
        <View style={styles.container}>
            {error ? <ErrorMessage/> : null}     
            <Formik
                initialValues={{ email: "", password: ""}}
                onSubmit={(values, action) => {
                    login(values.password, values.email, callback, newUser)
                    action.resetForm() 
                }}
                validationSchema={authSchema}
            >
                {(props) => (
                    <View>
                        <View style={styles.logintextContainer}>
                            <Text style={styles.loginText}>Log into</Text>
                            <Text style={styles.loginText}>your account</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.input}>
                                {/* <Text style={styles.inputText}>Email</Text> */}
                                <TextInput 
                                    placeholder="Email"
                                    style={styles.inputStyle}
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email}
                                    onBlur={props.handleBlur('email')}
                                />
                                <Text style={styles.inputText}>{ props.touched.email && props.errors.email}</Text>
                            </View>
                            <View  style={styles.input}>
                                {/* <Text style={styles.inputText}>Password</Text> */}
                                <TextInput 
                                    placeholder="Password"
                                    style={styles.inputStyle}
                                    secureTextEntry={true}
                                    onChangeText={props.handleChange('password')}
                                    value={props.values.password}
                                    onBlur={props.handleBlur('password')}
                                />
                                <Text style={styles.inputText}>{ props.touched.password && props.errors.password}</Text>
                            </View>
                            </View>
                        <FlatButton text='Log In' onPress={() => {
                            props.handleSubmit();
                            setState({ loading: true })
                            }}/>
                    </View>
                )}
            </Formik>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.registerText}>Don't have an account yet? <Text style={styles.register}>Register</Text></Text>
            </TouchableOpacity>
        </View>
    )
}



export default connect(null, { login, newUser })(Login)