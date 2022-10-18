import axios from "axios"

export const TaskListApiService = {
    updateTask: async (taskId, payload) => {
        const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
            method: 'PATCH',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        if (!response.ok) { throw new Error(`Error: ${response.status}`)}
        const updatedTask = await response.json()
        return updatedTask.data
    },
    updateTaskAxios: async( taskId, payload) => {
        const updatedTask = await axios.patch(`http://localhost:8000/api/tasks/${taskId}`,payload)
        return updatedTask.data.data
    },
    createTaskAxios: async (payload) => {
        const createdTask = await axios.post(`http://localhost:8000/api/tasks/`, payload)
        return createdTask.data.data
    },
    createTask: async (payload) => {
        const response = await fetch(`http://localhost:8000/api/tasks/`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        if (!response.ok) { throw new Error(`Error: ${response.status}`)}
        const createdTask = await response.json()
        return createdTask.data
    },
    getTasksAxios: async () => {
        const response = await axios.get("http://localhost:8000/api/tasks")
        return response.data
    },
    getTasks: async () => {
        try {
            const response = await fetch("http://localhost:8000/api/tasks")
            if (!response.ok) { throw new Error(`Error: ${response.status}`)}
            return await response.json()
        } catch(e) {
            return null
        }
    },
    destroyTaskAxios: async (taskId) => {
        const response = await axios.delete(`http://localhost:8000/api/tasks/${taskId}`)
        return response.data.data
    },
    destroyTask: async (taskId) => {
        const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
            },
        })
        if (!response.ok) { throw new Error(`Error: ${response.status}`)}
        return await response.json()
    }
}

