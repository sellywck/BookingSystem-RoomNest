import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [loading, setLoading] = useState(true);

  // firebase authentication
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    handleIdentityUpdate();
  }, [currentUser]);

  function handleIdentityUpdate() {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      const decode = jwtDecode(token);
      setIdentity(decode);
    } else {
      setIdentity(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, identity, handleIdentityUpdate }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
