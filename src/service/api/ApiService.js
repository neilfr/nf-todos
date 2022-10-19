import FetchApiService from "./FetchApiService"
import AxiosApiService from "./AxiosApiService";

const service = AxiosApiService

const getTasks = async () => {
    return service.getTasks()
}

const createTask = async (payload) => {
    return service.createTask(payload)
}

const destroyTask = async (taskId) => {
    return service.destroyTask(taskId)
}

const updateTask = async (taskId, payload) => {
    return service.updateTask(taskId,payload)
}

const getStages = async () => {
    return service.getStages()
}

export { getTasks, updateTask, createTask, destroyTask, getStages }