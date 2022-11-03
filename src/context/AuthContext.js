import React, {createContext, useContext, useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ApiContext} from "./ApiContext";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    let navigate = useNavigate()
    const [authed, setAuthed] = useState()
    const {login, logout, getUser} = useContext(ApiContext)
    const goTasks = () => {
        navigate("/tasks")
    }

    const logMeIn = async (email, password) => {
        try{
            await login(email, password);
            updateAuthed(true)

        } catch (e){
            console.log('redirect back to clean login page with login failure message')
        }

        await getUser();

        goTasks()
    }

    const updateAuthed = (x) => {
        setAuthed(x)
    }

    const logMeOut = async () => {
        await logout();
        updateAuthed(false)
        console.log('logged out')
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{
            authed,
            updateAuthed,
            roles:['admin', 'user'],
            logout: logMeOut,
            login: logMeIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}