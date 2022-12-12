import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { StyleSheet } from 'react-native'

export default function Loading(){
    return(
        <View style={styles.centered}>
            <ActivityIndicator size="large" color='#ff5dc8' />
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }
})