import { useState, useContext, createContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signin = (newUser) => {
    // Header
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3000");

    // Request option
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(newUser)
    };

    // Post
    fetch(`${process.env.REACT_APP_BACKEND}/user/login`, requestOptions)
      .then(res => res.json())
      .then(res => res.message ? setUser(null) : setUser(res))
      .catch(error => console.log('error on signin:', error));
  }

  const signup = (newUser, callback) => {
    // Header
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3000");

    // Request option
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(newUser)
    };

    // Post
    fetch(`${process.env.REACT_APP_BACKEND}/user/register`, requestOptions)
      .then(res => res.json())
      .then(res => res?.message === `Utilisateur crée : ${newUser?.email}` ? callback(true) : callback(false))
      .catch(error => console.log('error on signup:', error));
  }

  const signout = callback => {
    return (() => {
      setUser(null);
      callback();
    })()
  }

  const value = { user, signin, signout, signup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
