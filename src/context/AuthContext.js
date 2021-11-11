import React, { useState } from "react";
import Auth from "@aws-amplify/auth";

const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const loadApp = async () => {
        await Auth.currentAuthenticatedUser()
        .then((user) => {
          signIn(user);
        })
        .catch(() => {
          console.log('err signing in');
        });
      setLoading(false);
    }

    const signOut = async () => { 
        await Auth.signOut()
          .catch((err) => {
            console.log('ERROR: ', err);
          });
        setToken('');
        setUsername('');
        setEmail('');
      };

    const signIn = async (user) => {
        //console.log(user.signInUserSession);
        setToken(user.signInUserSession.accessToken.jwtToken);
        setUsername(user.signInUserSession.accessToken.payload.username);
        setEmail(user.signInUserSession.idToken.payload.email);
        
    }
    
    return <AuthContext.Provider value={{token, loading, username, email, loadApp, signIn, signOut}}>
        {children}
    </AuthContext.Provider>;
};

export default AuthContext;
