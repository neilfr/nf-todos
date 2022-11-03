import React, {createContext} from 'react'
import axios from "axios";

export const ApiContext = createContext()

export const ApiProvider = ({children}) => {

    // const http = axios.create({
    //     baseURL: 'http://localhost:8000',
    //     headers: {
    //         'X-Requested-With': 'XMLHttpRequest',
    //     },
    //     withCredentials: true,
    // })

    const getCsrf = async () => {
        const csrf = await axios.get('http://localhost:8000/sanctum/csrf-cookie')
        console.log('csrf =', csrf)
    }

    const getStages = async () => {
        const response = await axios.get("http://localhost:8000/api/stages",{
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            withCredentials: true,
        })
        return response.data
    }

    const getTasks = async () => {
        const response = await axios.get("http://localhost:8000/api/tasks", {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            withCredentials: true,
        })
        return response.data
    }

    const updateTask = async (taskId, payload) => {
        const updatedTask = await axios.patch(`http://localhost:8000/api/tasks/${taskId}`,
            payload, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
                withCredentials: true,
            })
        return updatedTask.data.data
    }

    const destroyTask = async (taskId) => {
        const response = await axios.delete(`http://localhost:8000/api/tasks/${taskId}`, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            withCredentials: true,
        })
        return response.data.data
    }

    const createTask = async (payload) => {
        const createdTask = await axios.post(`http://localhost:8000/api/tasks/`,
            payload, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
                withCredentials: true,
            })
        return createdTask.data.data
    }

    const login = async (email, password) => {
        const foo = await axios.post('http://localhost:8000/login', {
            email: email,
            password: password,
        }, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            withCredentials: true,
        })
        console.log('login =', foo)
    }

    return(
        <ApiContext.Provider value={{
            login, getCsrf, getStages, updateTask, destroyTask, createTask, getTasks
        }}>
            {children}
        </ApiContext.Provider>
    )
}