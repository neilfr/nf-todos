import React, {createContext} from 'react'
import AxiosApiService from "../service/api/AxiosApiService";
import FetchApiService from "../service/api/FetchApiService";

export const ApiContext = createContext()

export const ApiProvider = ({children}) => {

    // const service = FetchApiService
    const service = AxiosApiService

    const getCsrf = async () => {
        const csrf = await service.getCsrf()
        return csrf
    }

    const login = async (email, password) => {
        await getCsrf()
        return await service.login(email, password)
    }

    const logout = async () => {
        return await service.logout()
    }

    const getUser = async () => {
        return await service.getUser()
    }

    const getStages = async () => {
        return await service.getStages()
    }

    const getTasks = async () => {
        return await service.getTasks()
    }

    const updateTask = async (taskId, payload) => {
        return await service.updateTask(taskId, payload)
    }

    const destroyTask = async (taskId) => {
        return await service.destroyTask(taskId)
    }

    const createTask = async (payload) => {
        return await service.createTask(payload)
    }

    return(
        <ApiContext.Provider value={{
            login, logout, getCsrf, getStages, updateTask, destroyTask, createTask, getTasks, getUser
        }}>
            {children}
        </ApiContext.Provider>
    )
}