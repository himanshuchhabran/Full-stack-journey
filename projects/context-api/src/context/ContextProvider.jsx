import React, { useState } from 'react'
import { AuthContext } from './AuthContext';

const ContextProvider = ({children}) => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    const login = ()=>{
        setIsLoggedIn(true);
    }

    const logout = ()=>{
        setIsLoggedIn(false);
    }
  return (
    <div>
        <AuthContext.Provider value={{isLoggedIn,login,logout}}>
            {children}
        </AuthContext.Provider>
    </div>
  )
}

export default ContextProvider