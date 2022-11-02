import React, {createContext} from 'react'
import axios from "axios";

export const ApiContext = createContext()

export const ApiProvider = ({children}) => {
    axios.defaults.withCredentials=true
    axios.defaults.baseURL='http://localhost:8000'

    const http = axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
        withCredentials: true,
    })

    const getCsrf = async () => {
        const csrf = await http.get('/sanctum/csrf-cookie')
        console.log('csrf =', csrf)
    }

    const getStages = async () => {
        const response = await axios.get("http://localhost:8000/api/stages")
        return response.data
    }

    return(
        <ApiContext.Provider value={{
            http, getCsrf, getStages
        }}>
            {children}
        </ApiContext.Provider>
    )
}