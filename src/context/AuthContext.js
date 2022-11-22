import React, {createContext, useContext, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {ApiContext} from "./ApiContext";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    let navigate = useNavigate()
    const {apiService} = useContext(ApiContext)
    const isLoggedIn = () => {
        if (apiService.getUser() && apiService.getUser().id != null) return true
        return false
    }
    const [authed, setAuthed] = useState(isLoggedIn())
    const goTasks = () => {
        navigate("/tasks")
    }
    const goHome = () => {
        navigate("/")
    }


    const logMeIn = async (email, password) => {
        try{

            const response = await apiService.login(email, password);
            setAuthed(response)
            if (response) {
                goTasks()
            } else {
                goHome()
            }
        } catch (e){
            console.log('Login failed, redirect back to clean login page with login failure message', e.message)
        }
    }

    const logMeOut = async () => {
        const res = await apiService.logout();
        setAuthed(false)
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