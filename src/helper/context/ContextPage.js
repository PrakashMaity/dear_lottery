import React, { createContext, useState } from 'react'

export const myContext = createContext();

export default function ContextApi(props) {
    const [userDetails, setUserDetails] = useState("")
    const [themeColor, setThemeColor] = useState("")
    return (
        <myContext.Provider value={{
            userDetails, setUserDetails,
            themeColor, setThemeColor
        }}
        >
            {props.children}
        </myContext.Provider>
    )
}
