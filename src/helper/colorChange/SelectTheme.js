import { BlueShades, PurpleShades } from "./ColorsObject"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from "react";
import { myContext } from "../context/ContextPage";
// export const rang1 = (whichColor) => {
//     // var a = await AsyncStorage.getItem("theme")

//     // console.log("--------------", a)
//     switch (whichColor) {
//         case "Blue": return BlueShades;
//         case "purple": return PurpleShades;
//         default: return PurpleShades
//     }
// }
export const rang = () => {
    const { themeColor } = useContext(myContext)
    // console.log("-------------------------------", themeColor)
    // console.log(themeColor == "Blue")
    if (themeColor == "Blue") {
        // console.log("blue ***blue /// blue")
        return BlueShades
    } else if (themeColor == "Purple") {
        // console.log("Purple ***Purple /// Purple")
        return PurpleShades
    } else {
        // console.log("else ***else /// else")
        return PurpleShades
    }
}