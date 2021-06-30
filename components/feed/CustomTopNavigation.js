import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import TopTab from './TopTab'
import { View } from 'react-native'

function CustomTopNavigation({ state, navigation }) {
    const [selected, setSelected] = useState('For You')
    const { routes } = state

    const renderColor = (currentTab) => (currentTab === selected ? "white" : "gray")

    const handlePress = (activeTab, index) => {
        if (state.index !== index) {
            setSelected(activeTab)
            navigation.navigate(activeTab)
        }
    }
    return (
        <View style={styles.container}>
            { routes.map((route, index) => (
                <TopTab 
                tab={route}
                onPress={() => handlePress(route.name, index)}
                color={renderColor(route.name)}
                key={route.key}
                />
            ))}
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "space-between",
        backgroundColor: "#1b1a20",
        elevation: 3,
        alignItems: "center",
        justifyContent: "center",
    }
})



export default CustomTopNavigation






