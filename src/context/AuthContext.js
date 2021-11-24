import React, { useState } from "react";
import Auth from "@aws-amplify/auth";

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

  const loadApp = async () => {
    await Auth.currentAuthenticatedUser()
      .then((user) => {
        signIn(user);
      })
      .catch(() => {
        console.log("err signing in");
      })
      .then(() => setLoading(false));
  };

  const signOut = async () => {
    await Auth.signOut().catch((err) => {
      console.log("ERROR: ", err);
    });
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
    console.log(user.signInUserSession.idToken.payload["custom:group"]);
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
