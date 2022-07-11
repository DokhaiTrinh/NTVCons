import React, { createContext, useState } from "react";

const value = {
  user: null,
  signIn: null,
  signUp: null,
  signOut: null
};

const AuthContext = createContext(value);

function AuthProvider({children}) {

  const [user, setUser] = useState();

  const signIn = (phoneNumber, password) => {}
  const signUpWithPhoneNumber = (phoneNumber) => {}
  const signOut = () => {}

  const value = {user, signIn, signUpWithPhoneNumber, signOut};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext}
export default AuthProvider
