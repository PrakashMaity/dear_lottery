import { View, Text, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { globalStyles } from '../../constant/StylePage'
import { getAsync, setAsync } from '../../helper/asyncstorage/AsyncStoragePage'
import { useNavigation } from '@react-navigation/native'
import { Normalize } from '../../constant/for_responsive/Dimens'
import { images } from '../../constant/Images'
import { myContext } from '../../helper/context/ContextPage'
import { PurpleShades } from '../../helper/colorChange/ColorsObject'

export default function IntroPage() {
    const { themeColor, setThemeColor } = useContext(myContext)
    const navigation = useNavigation()

    const checkisLogin = async () => {
        const res = await getAsync('isLogin')
        const theme = await getAsync('theme')

        // console.log("======",theme)

        if (theme != null ) {
            // console.log("-------------------")
            setThemeColor(theme)
        } else {
            // console.log("********************")

            setThemeColor(PurpleShades.Title)
            setAsync("theme", PurpleShades.Title)
        }

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