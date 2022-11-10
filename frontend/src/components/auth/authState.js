import { useState, useContext, createContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signin = (newUser) => {
    // Header
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Request option
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(newUser)
    };

    // Post
    fetch(`/users/signin`, requestOptions)
      .then(res => res.json())
      .then(res => res.length > 0 ? setUser(res[0]) : false)
      .catch(error => console.log('error on signin:', error));
  }

  const signup = (newUser, callback) => {
    // Header
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Request option
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(newUser)
    };

    // Post
    fetch(`/users`, requestOptions)
      .then(res => res.json())
      .then(res => res ? callback() : false)
      .catch(error => console.log('error on signup:', error));
  }

  const signout = callback => {
    return (() => {
      setUser(null);
      callback();
    })()
  }

  const update = (newUser, callback) => {
    // Header
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("authorization", `Bearer ${user.token}`);

    // Request option
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(newUser)
    };

    // PUT
    fetch(`/users/update/${newUser.idUser}`, requestOptions)
      .then(res => res.json())
      .then(res => {
        setUser(res[0]);
        callback();
      })
      .catch(error => console.log('error on update user:', error));
  }

  const value = { user, signin, signout, signup, update };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
