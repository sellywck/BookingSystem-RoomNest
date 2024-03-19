import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  // const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      // console.log(user)
    });
  }, []);

  const value = { currentUser };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// import { createContext, useEffect, useState } from "react"
// import {auth}  from "../firebase";
// import { onAuthStateChanged } from "firebase/auth";

// export const AuthContext = createContext()

// export default function AuthProvider({children}) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoggedIn, setUserLoggedIn] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [isEmailUser, setIsEmailUser] = useState(false)

//   useEffect(()=> {
//     const unsubsribe = onAuthStateChanged(auth, initializeUser)
//     return unsubsribe
//   }, [])

//   async function initializeUser (user){
//     if (user) {
//       setCurrentUser({...user});
//       const isEmail = user.providerData.some(
//         (provider) => provider.providerId === "password"
//       );
//       setIsEmailUser(isEmail)
//       setUserLoggedIn(true)
//     } else{
//       setCurrentUser(null);
//       setUserLoggedIn(false)
//     }
//     setLoading(false)
//   }
//   const value = {currentUser, userLoggedIn, isEmailUser, setCurrentUser}

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   )
// }
