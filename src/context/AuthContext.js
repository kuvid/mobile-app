import React, { useState, useEffect } from "react";
import Auth from "@aws-amplify/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [idToken, setIdToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [group, setGroup] = useState("");
  const [signedOut, setSignedOut] = useState(false);

  useEffect(() => {}, [signedOut]);

  const loadApp = async () => {
    await Auth.currentAuthenticatedUser()
      .then((user) => {
        signIn(user);
        setSignedOut(false);
      })
      .catch(() => {
        console.log("err signing in");
      })
      .then(() => setLoading(false));
  };

  const signOut = async () => {
    try {
      await Auth.signOut();
      setSignedOut(true);
      console.log("trying to sign out...");
    } catch (error) {
      console.log("ERROR LOGGING OUT: ", err);
    }
    // await Auth.signOut()
    //   .then(() => {
    //     setSignedOut(true);
    //   })
    //   .catch((err) => {
    //     console.log("ERROR: ", err);
    //   });
    setToken("");
    setIdToken("");
    setUsername("");
    setEmail("");
    setName("");
    setFamilyName("");
    setIdNumber("");
  };

  const signIn = async (user) => {
    //console.log(user.signInUserSession);
    setToken(user.signInUserSession.accessToken.jwtToken);
    setIdToken(user.signInUserSession.idToken.jwtToken);
    setUsername(user.signInUserSession.accessToken.payload.username);
    setEmail(user.signInUserSession.idToken.payload.email);
    setName(user.signInUserSession.idToken.payload.name);
    setFamilyName(user.signInUserSession.idToken.payload.family_name);
    setIdNumber(user.signInUserSession.idToken.payload["custom:idNumber"]);
    setGroup(user.signInUserSession.idToken.payload["custom:group"]);
    //console.log(user.signInUserSession.idToken.payload["custom:group"]);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        idToken,
        loading,
        username,
        email,
        name,
        familyName,
        idNumber,
        group,
        loadApp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
