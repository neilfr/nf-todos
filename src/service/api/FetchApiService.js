import axios from "axios";

const FetchApiService = {
    getCsrf : async () => {
        const csrf = await fetch('http://localhost:8000/sanctum/csrf-cookie')
        console.log('fetch, csrf =', csrf)
        return csrf
    },
    getStages: async () => {
        const response = await fetch("http://localhost:8000/api/stages",{
            method: "GET",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        })
        if (!response.ok) { throw new Error(`Error: ${response.status}`)}
        return await response.json()
    },
    createTask: async (payload) => {
        const response = await fetch(`http://localhost:8000/api/tasks/`, {
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        if (!response.ok) { throw new Error(`Error: ${response.status}`)}
        const createdTask = await response.json()
        return createdTask.data
    },
    getTasks: async () => {
        try {
            const response = await fetch("http://localhost:8000/api/tasks", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-type": "application/json",
                },
            })
            if (!response.ok) { throw new Error(`Error: ${response.status}`)}
            return await response.json()
        } catch(e) {
            return null
        }
    },
    updateTask: async (taskId, payload) => {
        console.log('update')
        console.log('taskId', taskId)
        console.log('payload', payload)
        const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
            method: 'PATCH',
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        console.log('update response', response)
        if (!response.ok) { throw new Error(`Error: ${response.status}`)}
        const updatedTask = await response.json()
        return updatedTask.data
    },
    destroyTask: async (taskId) => {
        const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        })
        if (!response.ok) { throw new Error(`Error: ${response.status}`)}
        return await response.json()
    },
    login : async (email, password) => {
        await fetch('http://localhost:8000/login', {
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
    },
    logout : async () => {
        await fetch('http://localhost:8000/logout',{
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            }
        })
    },
    getUser : async () => {
        const user = await fetch('http://localhost:8000/api/user',
            {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
                withCredentials: true,
            })
        console.log('user =', user)
    }
}

export default FetchApiService