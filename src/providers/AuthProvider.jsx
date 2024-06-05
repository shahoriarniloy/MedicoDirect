import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";

export const AuthContext =createContext(null);

const AuthProvider = ({children}) => {
    const axiosPublic = UseAxiosPublic();
    const [user, setUser]= useState(null);
    const [loading, setLoading]= useState(true);
    const createUser = (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile=(name,image)=>{
        return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL: image
        })
    }

    const signInUser = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)

    }

    const logOut =()=>{
        setLoading(true);
        signOut(auth);

    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            if(currentUser){
                const userInfo = {email:currentUser.email};
                axiosPublic.post('/jwt',userInfo)
                .then(res=>{

                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                    }
                })

            }
            else{
                localStorage.removeItem('access-token');

            }
            console.log('observing user',currentUser);
            setLoading(false);

                });
                return ()=>{
                    unSubscribe();
                }
    },[axiosPublic])
    const authInfo ={user, createUser, signInUser, logOut, updateUserProfile, loading}


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
            
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes ={
    children: PropTypes.node
}
