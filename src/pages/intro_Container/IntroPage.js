import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { globalStyles } from '../../constant/StylePage'
import { getAsync } from '../../helper/asyncstorage/AsyncStoragePage'
import { useNavigation } from '@react-navigation/native'
import { Normalize } from '../../constant/for_responsive/Dimens'
import { images } from '../../constant/Images'

export default function IntroPage() {

    const navigation = useNavigation()

    const checkisLogin = async () => {
        const res = await getAsync('isLogin')
        // console.log("res2-----", res)

        if (res == "false" || res == null) {
            navigation.replace("LoginOrSignUp")
        } else {
            navigation.replace("tabBar")
        }

    }

    useEffect(() => {
        checkisLogin()
    }, [])



    return (
        <View style={[globalStyles.mainContainer, { justifyContent: "center", alignItems: "center" }]} >
            <View style={{ height: Normalize(260), width: Normalize(260) }} >
                <Image source={images.splash} style={{ height: "100%", width: "100%", resizeMode: "contain" }} />
            </View>
        </View>
    )
}