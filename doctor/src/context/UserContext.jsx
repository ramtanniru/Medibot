'use client'
import { createContext, useState, useCallback, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user,setUser] = useState('');
    const addUser = useCallback((id) => {
        setUser(id);
    },[]);
    return <UserContext.Provider value={{ user,addUser }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext);