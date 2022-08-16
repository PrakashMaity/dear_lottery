import moment from "moment"

export const getseriesTime = (val) => {
    var a = new Date(val)
    // console.log(moment(a).format('hh a'))
    return moment(a).format('hh a')
}
export const getTime = (val) => {
    var a = new Date(val)
    // console.log(moment(a).format('hh:mm a'))
    return moment(a).format('hh:mm a')
}

export const todayDate = () => {
    var a = new Date()
    return moment(a).format('Do MMM,YY')
}
export const getDate = (val) => {
    var a = new Date(val)
    return moment(a).format('Do MMM,YY')
}

export const whichDay = () => {
    var a = new Date()
    return moment(a).format('dddd')
}