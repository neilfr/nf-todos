import React, {createContext, useContext, useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ApiContext} from "./ApiContext";
import FetchApiService from "../service/api/FetchApiService";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    let navigate = useNavigate()
    const {login, logout, getUser} = useContext(ApiContext)
    const isLoggedIn = () => {
        if (getUser() && getUser().id != null) return true
        return false
    }
    // console.log('auth provider, getUser()', getUser())
    const [authed, setAuthed] = useState(isLoggedIn())
    const goTasks = () => {
        navigate("/tasks")
    }
    const goHome = () => {
        navigate("/")
    }


    const logMeIn = async (email, password) => {
        try{

            const response = await login(email, password);
            console.log('logmein',response)
            setAuthed(response)
            if (response) {
                goTasks()
            } else {
                goHome()
            }
        } catch (e){
            console.log('login failed, redirect back to clean login page with login failure message', e.message)
        }
    }

    const logMeOut = async () => {
        await logout();
        setAuthed(false)
        console.log('logged out')
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{
            authed,
            setAuthed,
            roles:['admin', 'user'],
            logout: logMeOut,
            login: logMeIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}