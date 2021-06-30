import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import TabBar from './TabBar'


function CustomTabBar({ state, navigation }) {
    const [selected, setSelected] = useState('Feed')
    const { routes } = state

    const renderColor = (currentTab) => (currentTab === selected ? "white": "gray")

    const handlePress = (activeTab, index) => {
        if (state.index !== index) {
            setSelected(activeTab)
            navigation.navigate(activeTab)
        }
    }
    return (
        <View style={styles.container}>
                { routes.map((route, index) => <TabBar
                    tab={route}
                    icon={route.params.icon}
                    onPress={() => handlePress(route.name, index)}
                    color={renderColor(route.name)}
                    key={route.key}
                />)}
            </View>
    )
}


const styles = StyleSheet.create({
    tabContainer: {
        position: "relative",
        bottom: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        flexDirection: 'row',
        justifyContent: "space-between",
        elevation: 3,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1b1a20"
    }
})


export default CustomTabBar