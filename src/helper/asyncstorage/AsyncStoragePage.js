import AsyncStorage from '@react-native-async-storage/async-storage';
export const getAsync=async(val)=>{
    const res = await AsyncStorage.getItem(val)
    return res
} 