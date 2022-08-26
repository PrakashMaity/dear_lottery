import React, { createContext, useState } from 'react';

export const myContext = createContext();

export default function ContextApi(props) {
  const [userID, setUserID] = useState('');
  const [accountDetails, setAccountDetails] = useState('');
  const [userDetails, setUserDetails] = useState('');
  const [userAllDetails, setUserAllDetails] = useState('');
  const [themeColor, setThemeColor] = useState('');
  return (
    <myContext.Provider
      value={{
        userID,
        setUserID,
        userDetails,
        setUserDetails,
        themeColor,
        setThemeColor,
        userAllDetails,
        setUserAllDetails,
        accountDetails,
        setAccountDetails,
      }}
    >
      {props.children}
    </myContext.Provider>
  );
}
