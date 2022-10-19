import axios from "axios"

const AxiosApiService = {
    getStages : async () => {
        const response = await axios.get("http://localhost:8000/api/stages")
        return response.data
    },
    updateTask : async (taskId, payload) => {
        const updatedTask = await axios.patch(`http://localhost:8000/api/tasks/${taskId}`,payload)
        return updatedTask.data.data
    },
    destroyTask : async (taskId) => {
        const response = await axios.delete(`http://localhost:8000/api/tasks/${taskId}`)
        return response.data.data
    },
    createTask : async (payload) => {
        const createdTask = await axios.post(`http://localhost:8000/api/tasks/`, payload)
        return createdTask.data.data
    },
    getTasks : async () => {
        const response = await axios.get("http://localhost:8000/api/tasks")
        return response.data
    }
}

export default AxiosApiService