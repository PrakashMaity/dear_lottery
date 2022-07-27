import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../../constant/StylePage'
import { Colors } from '../../constant/Colors'


export default function Login() {
    return (
        <View style={[styles.mainContainer, { backgroundColor: Colors.background_shade, }]} >
            <Text>Login</Text>
        </View>
    )
}