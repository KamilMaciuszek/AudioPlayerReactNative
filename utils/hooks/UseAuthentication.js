import {  onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import auth from '../../firebaseConfig';


export function useAuthentication() {

  const [user, setUser] = useState();
  useEffect(() => {
    if (auth) {
      try{
        const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user);
          } else {
            setUser(undefined);
          }
        });
    
        return unsubscribeFromAuthStatuChanged;
      }
      catch(error) {
        console.log(error)
      }
     
    }
    
  },[]);

  return {
    user
  };
}