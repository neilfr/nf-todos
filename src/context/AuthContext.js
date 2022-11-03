import React, {createContext, useContext, useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ApiContext} from "./ApiContext";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    let navigate = useNavigate()
    const [authed, setAuthed] = useState()
    const {login} = useContext(ApiContext)
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

        const user = await axios.get('http://localhost:8000/api/user',
            {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
                withCredentials: true,
            })
        console.log('user =', user)

        goTasks()
    }

    const updateAuthed = (x) => {
        setAuthed(x)
    }

    const logout = () => {
        axios.post('http://localhost:8000/logout',
            null,
            {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
                withCredentials: true,
            }).then(
            (res) => {
                updateAuthed(false)
                console.log('logged out')
                navigate('/login')
            }
        )
    }

    return (
        <AuthContext.Provider value={{
            authed,
            updateAuthed,
            roles:['admin', 'user'],
            logout,
            login: logMeIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}