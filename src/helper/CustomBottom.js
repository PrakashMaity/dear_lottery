import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from '../constant/Colors'
import { Normalize } from '../constant/for_responsive/Dimens'

export default function CustomBottom({ name, onPress, loader }) {
    return (
        <TouchableOpacity
            disabled={loader}
            onPress={onPress}
            style={{
                height: Normalize(42),
                width: "100%",
                backgroundColor: Colors.purple,
                marginVertical: Normalize(12),
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: Normalize(50),
                elevation: Normalize(2)
            }} >
            {
                loader ?
                    <ActivityIndicator
                        size={"small"}
                        color={Colors.white}
                    />
                    :
                    <Text style={{ fontSize: Normalize(13), fontFamily: "Outfit-Medium", color: Colors.white }} >{name && name}</Text>
            }

        </TouchableOpacity>
    )
}