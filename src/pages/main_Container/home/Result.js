import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import ImageView from "react-native-image-viewing";
import { globalStyles } from '../../../constant/StylePage'
import Custom_header from '../../../helper/Custom_header'
import { few_constants } from '../../../constant/small_constant/Few_Constants'
import { Normalize } from '../../../constant/for_responsive/Dimens'
import { Colors } from '../../../constant/Colors'
import { getDate } from '../../../helper/TimeRelatedFunc';
import { modifiedAxiosGet } from '../../../http/axios/CustomAxiosCall';
import LoaderPage from '../../../helper/components/LoaderPage';

export default function Result() {
    const [visible, setIsVisible] = useState(false);
    const [selectImageIdx, setSelectImageIdx] = useState("");
    const [allResult, setAllResult] = useState([])
    const [loader, setLoader] = useState(false)
    const imagesOnpress = (val) => {
        setSelectImageIdx(val)
        setIsVisible(true)
    }
    const getWinnerResult = async () => {
        try {
            setLoader(true)
            const res = await modifiedAxiosGet("result/result_get_all");
            // console.log(res)
            if (res.status === 200) {
                // console.log("res : ", res.data.data);
                setLoader(false)

                var newArr = []
                res.data.data.map((item, index) => {
                    item.uri = item.result
                    newArr.push(item)
                })
                setAllResult(newArr)
            } else {
                setLoader(false)
                console.log("Failed : ", "Something went Wrong");
            }
        } catch (error) {
            setLoader(false)
            console.log("getWinnerResult---", error)
        }
    }
    useEffect(() => {
        getWinnerResult()
    }, [])
    return (
        <View style={globalStyles.mainContainer_withoutpadding} >
            <Custom_header back title={"Result"} />

            {
                loader ?
                    <LoaderPage />
                    :
                    <ScrollView>

                        <View style={{ flex: 1, paddingHorizontal: few_constants.paddingHorizantal, flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }} >
                            {
                                allResult.map((item, index) => (
                                    <View key={index} style={{ height: Normalize(190), width: "48%", backgroundColor: Colors.purple, borderRadius: Normalize(8), marginTop: Normalize(8), elevation: 2 }} >
                                        <View style={{ flex: 3.8 }} >
                                            <TouchableOpacity
                                                onPress={() => imagesOnpress(index)}
                                                style={{ flex: 1, backgroundColor: Colors.background_shade, margin: Normalize(5), borderRadius: Normalize(8), overflow: "hidden", borderWidth: Normalize(1), borderColor: Colors.purple }} >
                                                <Image source={{ uri: item.result }} style={{ height: "100%", width: "100%", resizeMode: "cover" }} />
                                            </TouchableOpacity>
                                        </View>
                                        {
                                            visible &&
                                            <ImageView
                                                images={allResult}
                                                imageIndex={selectImageIdx}
                                                visible={visible}

                                                onRequestClose={() => setIsVisible(false)}
                                                FooterComponent={(item) => (
                                                    <Text style={{ color: "white", fontSize: Normalize(15), textAlign: "center", fontFamily: "Outfit-Medium", paddingVertical: Normalize(8) }} >{allResult[(item.imageIndex)].time} results</Text>
                                                )}
                                            />
                                        }

                                        <View style={{ flex: 1, alignItems: "flex-start", paddingHorizontal: Normalize(8) }} >
                                            <Text style={[globalStyles.planeText_outfit_Medium, { color: Colors.white, letterSpacing: 1 }]} >{allResult[index].time} results</Text>
                                            <Text style={[globalStyles.planeText_outfit_Medium, { color: Colors.white, fontSize: Normalize(10), paddingTop: Normalize(3) }]} >{getDate(item.createdAt)}</Text>
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                    </ScrollView>
            }

        </View>
    )
}

