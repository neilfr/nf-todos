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
        const response = await http.get("http://localhost:8000/api/stages")
        return response.data
    }

    const updateTask = async (taskId, payload) => {
        const updatedTask = await http.patch(`http://localhost:8000/api/tasks/${taskId}`,payload)
        return updatedTask.data.data
    }
    const destroyTask = async (taskId) => {
        const response = await http.delete(`http://localhost:8000/api/tasks/${taskId}`)
        return response.data.data
    }
    const createTask = async (payload) => {
        const createdTask = await http.post(`http://localhost:8000/api/tasks/`, payload)
        return createdTask.data.data
    }
    const getTasks = async () => {
        const response = await http.get("http://localhost:8000/api/tasks")
        return response.data
    }

    return(
        <ApiContext.Provider value={{
            http, getCsrf, getStages, updateTask, destroyTask, createTask, getTasks
        }}>
            {children}
        </ApiContext.Provider>
    )
}