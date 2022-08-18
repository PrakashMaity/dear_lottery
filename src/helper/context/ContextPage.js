import React, { createContext, useState } from 'react'

export const myContext = createContext();

export default function ContextApi(props) {
    const [userDetails, setUserDetails] = useState("")
    const [userAllDetails, setUserAllDetails] = useState("")
    const [themeColor, setThemeColor] = useState("")
    return (
        <myContext.Provider value={{
            userDetails, setUserDetails,
            themeColor, setThemeColor,
            userAllDetails, setUserAllDetails
        }}
        >
            {props.children}
        </myContext.Provider>
    )
}
