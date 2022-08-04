import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { globalStyles } from '../../constant/StylePage'
import { Colors } from '../../constant/Colors'

export default function LoaderPage() {
    return (
        <View style={[globalStyles.mainContainer, { justifyContent: "center", alignItems: "center" }]} >
            <ActivityIndicator
                size={"large"}
                color={Colors.purple}
            />
        </View>
    )
}