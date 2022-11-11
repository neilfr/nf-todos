import React, {createContext} from 'react'
import AxiosApiService from "../service/api/AxiosApiService";
import FetchApiService from "../service/api/FetchApiService";

let i = 0;
export const ApiContext = createContext()

export const ApiProvider = ({children}) => {

    // const http = axios.create({
    //     baseURL: 'http://localhost:8000',
    //     headers: {
    //         'X-Requested-With': 'XMLHttpRequest',
    //     },
    //     withCredentials: true,
    // })
    const service = AxiosApiService

    const getCsrf = async () => {
        i++;
        const csrf = await FetchApiService.getCsrf()
        console.log('count', i)
        console.log('context csrf =', csrf)
    }

    const getStages = async () => {
        // return await FetchApiService.getStages()
        return await service.getStages()
    }

    const getTasks = async () => {
        return await service.getTasks()
        // return FetchApiService.getTasks()
    }

    const updateTask = async (taskId, payload) => {
        return await service.updateTask(taskId, payload)
        // return FetchApiService.updateTask(taskId, payload)
    }

    const destroyTask = async (taskId) => {
        return await service.destroyTask(taskId)
    }

    const createTask = async (payload) => {
        return await service.createTask(payload)
    }

    const login = async (email, password) => {
        await getCsrf()
        await service.login(email, password)
    }

    const logout = async () => {
        await service.logout()
    }

    const getUser = async () => {
        await service.getUser()
    }

    return(
        <ApiContext.Provider value={{
            login, logout, getCsrf, getStages, updateTask, destroyTask, createTask, getTasks, getUser
        }}>
            {children}
        </ApiContext.Provider>
    )
}