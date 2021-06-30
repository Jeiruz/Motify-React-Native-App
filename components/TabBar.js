import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

function TabBar({ color, onPress, tab, icon }) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
            height: 50,
            backgroundColor: "#1b1a20"
        }
    })
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {icon && <Feather name={icon} size={25} color={color}/>}
            {/* <Text style={{ color }}>{tab.name}</Text> */}
        </TouchableOpacity>
    )
}



export default TabBar