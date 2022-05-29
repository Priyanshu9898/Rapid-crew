import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  sendPasswordResetEmail,
  onAuthStateChanged,
  confirmPasswordReset,
} from "firebase/auth";


const AuthContext = createContext({
  currentUser: null,

  forgotPassword: () => Promise,
  resetPassword: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {}, [currentUser]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
    });
  }, []);

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email, {
      url: `http://localhost:3000/login`,
    });
  }

  function resetPassword(oobCode, newPassword) {
    return confirmPasswordReset(auth, oobCode, newPassword);
  }

  const value = {
    currentUser,
    forgotPassword,
    resetPassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
