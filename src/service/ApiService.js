export const updateTask = async (taskId, payload) => {
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
}

export const createTask = async (payload) => {
    const response = await fetch(`http://localhost:8000/api/tasks/`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    if (!response.ok) { throw new Error(`Error: ${response.status}`)}
    const createdTask = response.json()
    return createdTask.data
}

export const getTasks = async () => {
    const response = await fetch("http://localhost:8000/api/tasks")
    return await response.json()
}

export const destroyTask = async (taskId) => {
    const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json",
        },
    })
    return await response.json()
}