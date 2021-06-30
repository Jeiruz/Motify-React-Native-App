import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import FlatButton from '../shared/FlatButton'
import * as yup from 'yup'
import { styles } from './Styles'
import ErrorMessage from '../shared/ErrorMessage'
import { connect } from 'react-redux'
import { register } from '../../actions/auth'
import Loading from '../shared/Loading'
import { newUser } from '../../actions/new'

const authSchema = yup.object({
    name: yup.string().required(),
    password: yup.string().required().min(8),
    password2: yup.string().required().min(8),
    email: yup.string().required().min(8).email()

})


const Register = ({ navigation, register, newUser, route }) => {
        const [match, setMatch] = useState(false)
        const [state, setState] = useState({
            loading: false,
            error: false
        })
        const { loading, error } = state
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
        if (match) {
            setTimeout(() => {
                setMatch(false)
            }, 5000)
        } else if (error) {
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
                {match ? <ErrorMessage text={"Password didn't match"}/> : null }
                {error ? <ErrorMessage/> : null}     
                <Formik
                    initialValues={{ name: "", password: "", password2: "", email: ""}}
                    validationSchema={authSchema}
                    onSubmit={(values, action) => {
                       if (values.password !== values.password2) {
                           setMatch(true)
                       } else if (values.password === values.password2) {
                           setState({ loading: true })
                           register(values.name, values.password, values.email, callback, newUser)
                       }
                       action.resetForm() 
                    }}
                >
                    {(props) => (
                        <View>
                            <View style={styles.logintextContainer}>
                                <Text style={styles.loginText}>Create</Text>
                                <Text style={styles.loginText}>an account</Text>
                            </View>
                            <View style={styles.registerInputContainer}>
                                <View style={styles.registerInput}>
                                    {/* <Text style={styles.inputText}>Full Name</Text> */}
                                    <TextInput 
                                        placeholder="Full Name"
                                        style={styles.inputStyle}
                                        onChangeText={props.handleChange('name')}
                                        value={props.values.name}
                                        onBlur={props.handleBlur('name')}
                                    />
                                    <Text style={styles.inputText}>{ props.touched.name && props.errors.name ? "name is required": ""}</Text>
                                </View>
                                <View style={styles.registerInput}>
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
                                <View style={styles.registerInput}>
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
                                <View style={styles.registerInput}>
                                    {/* <Text style={styles.inputText}>Confirm Password</Text> */}
                                    <TextInput 
                                        placeholder="Confirm Password"
                                        style={styles.inputStyle}
                                        secureTextEntry={true}
                                        onChangeText={props.handleChange('password2')}
                                        value={props.values.password2}
                                        onBlur={props.handleBlur('password2')}
                                    />
                                    <Text style={styles.inputText}>{ props.touched.password && props.errors.password}</Text>
                                </View>
                            </View>
                                <FlatButton text='Register' onPress={props.handleSubmit}/> 
                        </View>
                    )}
                </Formik>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.registerText}>Already have an account? <Text style={styles.register}>Log In</Text></Text>
                </TouchableOpacity>
            </View>
        )
}

export default connect(null, { register, newUser })(Register)
