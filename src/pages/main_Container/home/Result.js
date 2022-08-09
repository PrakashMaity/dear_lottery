import { View, Text, Linking, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ImageView from "react-native-image-viewing";
import { globalStyles } from '../../../constant/StylePage'
import Custom_header from '../../../helper/Custom_header'
import { few_constants } from '../../../constant/small_constant/Few_Constants'
import { Normalize } from '../../../constant/for_responsive/Dimens'
import { Colors } from '../../../constant/Colors'
import { todayDate } from '../../../helper/TimeRelatedFunc';

export default function Result() {
    const [visible, setIsVisible] = useState(false);
    const [selectImageIdx, setSelectImageIdx] = useState("");

    const images = [
        {
            title: "5 pm result",
            uri: "https://lotterysambadresult.in/wp-content/uploads/2020/07/EL250720-1.jpg",
        },
        {
            title: "9 pm result",
            uri: "https://www.newsgater.com/wp-content/uploads/2021/04/nagaland-state-lottery-result-today-4-pm-1-4-2021.jpg",
        },
        {
            title: "1 pm result",
            uri: "https://blogger.googleusercontent.com/img/a/AVvXsEjHecVun3iacRf7og7oJTPh8kf5Nyp7WrBIWXKYR0A1K65BaVjUXVnRb4mbeT92eZiZeFXnrEcDh0ZsRY9za23ERBJHjUixWmxbcRLjEr3QHUzB5-qQWsALUWOv86tO6WWBeAG_0pr8GSHY_4pZyvWbYMfsiY_4lxHrdpzDIuUbznp11NVUMmxTe1riOA",
        },
        {
            title: "6 pm result",
            uri: "https://nagalandlotterysambad.com/wp-content/uploads/2022/07/Screenshot-2022-07-19-at-1.10.18-PM.png",
        },
        {
            title: "11am result",
            uri: "https://www.newsgater.com/wp-content/uploads/2021/04/nagaland-state-lottery-result-today-4-pm-5-4-2021.jpg",
        },
    ];
    const imagesOnpress = (val) => {
        setSelectImageIdx(val)
        setIsVisible(true)
    }
    return (
        <View style={globalStyles.mainContainer_withoutpadding} >
            <Custom_header back title={"Result"} />
            <ScrollView>

                <View style={{ flex: 1, paddingHorizontal: few_constants.paddingHorizantal, flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }} >
                    {
                        images.map((item, index) => (
                            <View key={index} style={{ height: Normalize(190), width: "48%", backgroundColor: Colors.purple, borderRadius: Normalize(8), marginTop: Normalize(8), elevation: 2 }} >
                                <View style={{ flex: 3.8 }} >
                                    <TouchableOpacity
                                        onPress={() =>imagesOnpress(index) }
                                        style={{ flex: 1, backgroundColor: Colors.background_shade, margin: Normalize(5), borderRadius: Normalize(8), overflow: "hidden", borderWidth: Normalize(1), borderColor: Colors.purple }} >
                                        <Image source={{ uri: item.uri }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                                    </TouchableOpacity>
                                </View>
                                {
                                    visible &&
                                    <ImageView
                                        images={images}
                                        imageIndex={selectImageIdx}
                                        visible={visible}
                                        onRequestClose={() => setIsVisible(false)}
                                        FooterComponent={(item) => (
                                            <Text style={{ color: "white", fontSize: Normalize(15), textAlign: "center", fontFamily: "Outfit-Medium", paddingVertical: Normalize(8) }} >{images[(item.imageIndex)].title}</Text>
                                        )}
                                    />
                                }

                                <View style={{ flex: 1, alignItems: "flex-start", paddingHorizontal: Normalize(8) }} >
                                    <Text style={[globalStyles.planeText_outfit_Medium, { color: Colors.white, letterSpacing: 1 }]} >{item.title}</Text>
                                    <Text style={[globalStyles.planeText_outfit_Medium, { color: Colors.white, fontSize: Normalize(10),paddingTop:Normalize(3) }]} >{todayDate()}</Text>
                                </View>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>

        </View>
    )
}
{/* <Text onPress={()=>Linking.openURL("https://helpx.adobe.com/content/dam/help/en/photoshop/using/matching-replacing-mixing-colors/jcr_content/main-pars/before_and_after/image-after/match-outcome3.png")} >fghjkl</Text> */ }

