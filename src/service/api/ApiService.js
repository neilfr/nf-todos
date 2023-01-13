import FetchApiService from "./FetchApiService"
import AxiosApiService from "./AxiosApiService";

const service = AxiosApiService

// missing getCsrf... and it doesn't appear to be used anywhere

const login = async (email, password) => {
    return service.login(email, password)
}

const logout = async () => {
    return service.logout()
}

const getUser = async () => {
    return service.getUser()
}

const getStages = async () => {
    return service.getStages()
}

const getTasks = async () => {
    return service.getTasks()
}

const createTask = async (payload) => {
    return service.createTask(payload)
}

const updateTask = async (taskId, payload) => {
    return service.updateTask(taskId,payload)
}

const destroyTask = async (taskId) => {
    return service.destroyTask(taskId)
}

export { login, logout, getUser, getTasks, updateTask, createTask, destroyTask, getStages }