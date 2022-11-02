import React, {createContext, useContext, useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ApiContext} from "./ApiContext";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    let navigate = useNavigate()
    const {http} = useContext(ApiContext)
    const [authed, setAuthed] = useState(false)

    const goTasks = () => {
        navigate("/tasks")
    }

    const login = async (email, password) => {
        try{
            const login = await http.post('/login', {
                email: email,
                password: password,
            })
            console.log('login =', login)
            updateAuthed(true)

        } catch (e){
            console.log('redirect back to clean login page with login failure message')
        }

        const user = await http.get('/api/user')
        console.log('user =', user)

        // once authenticated, should go to the tasks route to see the tasklist
        // goHome()
        goTasks()
    }

    const updateAuthed = (x) => {
        setAuthed(x)
    }

    const logout = () => {
        http.post('/logout').then(
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
            login
        }}>
            {children}
        </AuthContext.Provider>
    )
}