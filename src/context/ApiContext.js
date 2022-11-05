import React, {createContext} from 'react'
import axios from "axios";
import AxiosApiService from "../service/api/AxiosApiService";

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
        const csrf = AxiosApiService.getCsrf()
        console.log('csrf =', csrf)
    }

    const getStages = async () => {
        return await AxiosApiService.getStages()
    }

    const getTasks = async () => {
        return AxiosApiService.getTasks()
    }

    const updateTask = async (taskId, payload) => {
        return AxiosApiService.updateTask(taskId, payload)
    }

    const destroyTask = async (taskId) => {
        return AxiosApiService.destroyTask(taskId)
    }

    const createTask = async (payload) => {
        return AxiosApiService.createTask(payload)
    }

    const login = async (email, password) => {
        await AxiosApiService.login(email, password)
    }

    const logout = async () => {
        await AxiosApiService.logout()
    }

    const getUser = async () => {
        await AxiosApiService.getUser()
    }

    return(
        <ApiContext.Provider value={{
            login, logout, getCsrf, getStages, updateTask, destroyTask, createTask, getTasks, getUser
        }}>
            {children}
        </ApiContext.Provider>
    )
}