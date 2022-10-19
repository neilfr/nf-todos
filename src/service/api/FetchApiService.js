const FetchApiService = {
    getTasks: async () => {
        try {
            const response = await fetch("http://localhost:8000/api/tasks")
            if (!response.ok) { throw new Error(`Error: ${response.status}`)}
            return await response.json()
        } catch(e) {
            return null
        }
    },
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
    destroyTask: async (taskId) => {
        const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
            },
        })
        if (!response.ok) { throw new Error(`Error: ${response.status}`)}
        return await response.json()
    },
    getStages: async () => {
        const response = await fetch("http://localhost:8000/api/stages",)
        if (!response.ok) { throw new Error(`Error: ${response.status}`)}
        return await response.json()
    }
}

export default FetchApiService