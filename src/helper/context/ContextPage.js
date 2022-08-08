import React, { createContext, useState } from 'react'

export const myContext = createContext();

export default function ContextApi(props) {
    const [userDetails, setUserDetails] = useState("")
    return (
        <myContext.Provider value={{
            userDetails, setUserDetails
        }}
        >
            {props.children}
        </myContext.Provider>
    )
}
