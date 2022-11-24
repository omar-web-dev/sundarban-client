import React, { createContext, useEffect, useState} from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState()
    const signIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const userSignOut = () =>{
        return signOut(auth);
    }

    const updateUserInfo = (userInfo) =>{
        return updateProfile(auth.currentUser, userInfo);
    }

    const googleLongIn = provider =>{
        return signInWithPopup(auth, provider)
    }


    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, [])

    const authInfo = {
        signIn,
        user,
        userSignOut,
        createUser,
        updateUserInfo,
        googleLongIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;