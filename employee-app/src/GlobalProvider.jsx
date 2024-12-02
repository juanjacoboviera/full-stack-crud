import React, { createContext, useState } from 'react';

export const GlobalStore = createContext();

export const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(null);
    console.log(token, user)
    return (
      <GlobalStore.Provider value={{ user, setUser, token, setToken }}>
        {children}
      </GlobalStore.Provider>
    );
  };