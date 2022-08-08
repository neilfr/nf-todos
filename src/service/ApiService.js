export const updateTask = async (taskId, payload) => {
    const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    if (!response.ok) { throw new Error(`Error: ${response.status}`)}
    return await response.json();
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
    return await response.json();
}

export const getTasks = async () => {
    const response = await fetch("http://localhost:8000/api/tasks")
    return await response.json()
}