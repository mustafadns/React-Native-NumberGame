import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Title({ children }) {
    return (
        <Text style={styles.title}>{ children }</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        borderWidth: 1,
        borderColor: 'red',
        textAlign: 'center',
        padding: 15,
        marginBottom: 20,
        borderRadius: 20,
        color: 'white',
        fontSize: 25,
    },
})