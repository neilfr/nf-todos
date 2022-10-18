import axios from "axios"

export const AxiosApiService = {
    getStagesAxios: async ()=> {
        const response = await axios.get("http://localhost:8000/api/stages")
        return response.data
    },
    updateTaskAxios: async( taskId, payload) => {
        const updatedTask = await axios.patch(`http://localhost:8000/api/tasks/${taskId}`,payload)
        return updatedTask.data.data
    },
    createTaskAxios: async (payload) => {
        const createdTask = await axios.post(`http://localhost:8000/api/tasks/`, payload)
        return createdTask.data.data
    },
    getTasksAxios: async () => {
        const response = await axios.get("http://localhost:8000/api/tasks")
        return response.data
    },
    destroyTaskAxios: async (taskId) => {
        const response = await axios.delete(`http://localhost:8000/api/tasks/${taskId}`)
        return response.data.data
    },
}