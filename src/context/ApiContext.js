import React, {createContext} from 'react'
import AxiosApiService from "../service/api/AxiosApiService";
import FetchApiService from "../service/api/FetchApiService";

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
        const csrf = await AxiosApiService.getCsrf()
        console.log('csrf =', csrf)
    }

    const getStages = async () => {
        // return await FetchApiService.getStages()
        return await AxiosApiService.getStages()
    }

    const getTasks = async () => {
        return await AxiosApiService.getTasks()
        // return FetchApiService.getTasks()
    }

    const updateTask = async (taskId, payload) => {
        return await AxiosApiService.updateTask(taskId, payload)
        // return FetchApiService.updateTask(taskId, payload)
    }

    const destroyTask = async (taskId) => {
        return await AxiosApiService.destroyTask(taskId)
    }

    const createTask = async (payload) => {
        return await AxiosApiService.createTask(payload)
    }

    const login = async (email, password) => {
        await getCsrf()
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