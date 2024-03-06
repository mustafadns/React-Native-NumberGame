import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function CopmuterGuess({roundNumber,guess}) {
    return (
        <View style={styles.listİtem}>
            <Text>Deneme Sayısı: {roundNumber}*</Text>
            <Text>Denenilen Sayı: {guess}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    listİtem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'yellow',
        marginVertical: 10,
        borderRadius: 30,
        elevation: 4,
        padding: 15,
        shadowColor: 'white',
        shadowOffset: { width:0 , height:2 },
        shadowRadius: 4,
        shadowOpacity: 0.25,
    },
})