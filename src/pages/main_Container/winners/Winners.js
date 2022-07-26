import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../../../constant/StylePage'
import Custom_header from '../../../helper/Custom_header'
import { few_constants } from '../../../constant/small_constant/Few_Constants'
import { Normalize } from '../../../constant/for_responsive/Dimens'
import { Colors } from '../../../constant/Colors'
import { addComma } from '../../../helper/AddComma'
import { modifiedAxiosGet } from '../../../http/axios/CustomAxiosCall'
import { getDate, getseriesTime, whichDay } from '../../../helper/TimeRelatedFunc'
import LoaderPage from '../../../helper/components/LoaderPage'

export default function Winners() {

    const [allWinners, setAllWinners] = useState([])
    const [loader, setLoader] = useState(false)

    const getWinnerResult = async () => {
        try {
            setLoader(true)
            const res = await modifiedAxiosGet("winner/winner_get_all");
            // console.log(res)
            if (res.status === 200) {
                // console.log("res : ", res.data.data);
                setLoader(false)
                setAllWinners(res.data.data)
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

    const WinnerCards = ({ item, index }) => {
        return (
            <View key={index} style={{ width: "99%", alignSelf: "center", backgroundColor: Colors.background_shade, borderRadius: Normalize(8), elevation: Normalize(2), marginBottom: Normalize(10), paddingVertical: Normalize(8), paddingHorizontal: Normalize(13), borderWidth: Normalize(1), borderColor: Colors.purple2 }} >
                <Text numberOfLines={1} style={[styles.textTitle, { paddingTop: Normalize(5) }]} ><Text style={styles.arrowStyle} >➢</Text>   Winner Name  :  <Text style={styles.textDetails} ></Text>  {item.name}</Text>
                <Text style={styles.textTitle} ><Text style={styles.arrowStyle} >➢   </Text>Winning Amount  :  {few_constants.rupee} {addComma(item.winAmount)}</Text>
                {item.series != null && <Text numberOfLines={1} style={styles.textTitle} ><Text style={styles.arrowStyle} >➢   </Text>{item.series.series} Ticket  :  {item.ticket_no}</Text>}
                <Text style={styles.textTitle} ><Text style={styles.arrowStyle} >➢   </Text>Ticket Price  :  {few_constants.rupee} {addComma(120)}</Text>
                <Text style={{ color: Colors.purple2, textAlign: "right", fontSize: Normalize(10), fontFamily: "Outfit-Medium", letterSpacing: 0.2 }} >{getDate(item.date)} | {whichDay(item.data)}</Text>
            </View>
        )
    }


    return (
        <View style={[globalStyles.mainContainer_withoutpadding]} >
            <Custom_header title={"Winners"} />
            {
                loader ?
                    <LoaderPage />
                    :
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View style={{ flex: 1, paddingHorizontal: few_constants.paddingHorizantal, paddingVertical: Normalize(10) }} >
                            {
                                allWinners.map((item, index) => (
                                    <View key={index} >
                                        <WinnerCards item={item} index={index} />
                                    </View>
                                ))
                            }
                        </View>
                    </ScrollView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    textTitle: { fontSize: Normalize(12), fontFamily: "Outfit-Medium", color: Colors.purple, paddingBottom: Normalize(5) },
    textDetails: { fontSize: Normalize(11), fontFamily: "Outfit-SemiBold", color: Colors.purple, paddingBottom: Normalize(5) },
    arrowStyle: { color: Colors.blueText2, fontSize: Normalize(12) }
})