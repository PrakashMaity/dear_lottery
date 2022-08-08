import axios from "axios"
const baseUrl = "https://shrouded-fortress-54793.herokuapp.com/api/"



export const axiosGet = async (link, data) => {
    try {
        // console.log(data)
        const res = await axios.get(`${baseUrl}${link}`, data)
        return res.data
    } catch (error) {
        return error
    }
}

export const axiosPost = async (link, data) => {
    try {
        // console.log(data)
        const res = await axios.post(`${baseUrl}${link}`, data)
        return res.data
    } catch (error) {
        return error
    }
}
export const axiosPatch = async (link, data) => {
    try {
        // console.log(data)
        const res = await axios.patch(`${baseUrl}${link}`, data)
        return res.data
    } catch (error) {
        return error
    }
}