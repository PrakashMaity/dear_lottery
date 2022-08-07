import { StyleSheet } from "react-native";
import { Colors } from "./Colors";
import { Normalize } from "./for_responsive/Dimens";
import { few_constants } from "./small_constant/Few_Constants";

export const globalStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.background_shade,
        paddingHorizontal: Normalize(15)
    },
    mainContainer_withoutpadding: {
        flex: 1,
        backgroundColor: Colors.background_shade,
    },
    pageHeaderText: { fontFamily: "Outfit-SemiBold", fontSize: Normalize(20), color: Colors.purple, paddingTop: Normalize(20) },
    pageSubHeaderText: { fontFamily: "Outfit-Regular", fontSize: Normalize(14), color: Colors.greylightText, paddingTop: Normalize(5) },
    textinputStyle: {
        height: Normalize(43),
        width: "100%",
        alignItems: "center",
        backgroundColor: Colors.white,
        marginBottom: Normalize(12),
        marginTop: Normalize(5),
        alignSelf: "center",
        borderRadius: Normalize(50),
        borderWidth: Normalize(1.5),
        borderColor: Colors.lightpurple,
        fontFamily: "Outfit-Medium",
        fontSize: Normalize(12),
        paddingHorizontal: Normalize(15),
        color: Colors.purple,
    },
    textinputStyle_onlybox: {
        height: Normalize(43),
        width: "100%",
        alignItems: "center",
        backgroundColor: Colors.white,
        marginBottom: Normalize(12),
        marginTop: Normalize(5),
        alignSelf: "center",
        borderRadius: Normalize(50),
        borderWidth: Normalize(1.5),
        borderColor: Colors.lightpurple,
        paddingHorizontal: Normalize(15),
        flexDirection: "row"
    },
    textinputStyle_onlytext: {
        fontFamily: "Outfit-Medium",
        fontSize: Normalize(12),
        color: Colors.purple,
        flex: 1
    },
    planeText_outfit_Medium: {
        fontSize: Normalize(13), fontFamily: "Outfit-Medium", color: Colors.white
    },
    planeText_outfit_regular: {
        fontSize: Normalize(13), fontFamily: "Outfit-Regular", color: Colors.purple
    },
    planeText_outfit_bold: { fontSize: Normalize(15), fontFamily: "Outfit-SemiBold", color: Colors.white },
    topicHeading: { fontSize: Normalize(15), fontFamily: "Outfit-SemiBold", color: Colors.blue, paddingVertical: few_constants.paddingHorizantal },



    textinputHeader: { color: Colors.purple, fontSize: Normalize(13), fontFamily: "Outfit-Medium", marginLeft: Normalize(1.5) }

})