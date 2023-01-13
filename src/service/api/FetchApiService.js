const getXSRFToken = () => {
    if (!document.cookie) {
        return null
    }

    const cookies = document.cookie.split(';');
    const xsrfCookie = cookies.filter((cookie)=>{
        if (cookie.includes('XSRF-TOKEN')) return cookie
    })

    const encodedToken = xsrfCookie[0].split('=')[1]
    const token = decodeURIComponent(encodedToken)
    return token
}

const baseUrl = 'http://localhost:8000'

const defaultHeaders = () => {
    return {
        "X-XSRF-TOKEN": getXSRFToken(),
        "Content-Type": "application/json",
        "Accept":"application/json,text/plain,*/*",
        "X-Requested-With": "XMLHttpRequest"
    }
}

const FetchApiService = {
    getCsrf : async () => {
        const csrf = await fetch(`${baseUrl}/sanctum/csrf-cookie`,{
            method: "GET",
            credentials: "include",
        })
        return csrf
    },
    login : async (email, password) => {
        const res = await fetch(`${baseUrl}/login`, {
            method: 'POST',
            credentials: "include",
            headers: defaultHeaders(),
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        return res.status === 200 ? true:false
    },
    logout : async () => {
        const res = await fetch(`${baseUrl}/logout`,{
            method: 'POST',
            credentials: "include",
            headers: defaultHeaders()
        })
        return res.status === 204 ? true:false
    },
    getUser : async () => {
        const response = await fetch(`${baseUrl}/api/user`,
            {
                credentials: "include",
                headers: defaultHeaders(),
            })
        return await response.json()
    },
    getStages: async () => {
        const response = await fetch(`${baseUrl}/api/stages`,{
            method: "GET",
            credentials: "include",
            headers: defaultHeaders(),
        })
        if (!response.ok) { throw new Error(`Error: ${response.status}`)}
        return await response.json()
    },
    getTasks: async () => {
        try {
            const response = await fetch(`${baseUrl}/api/tasks`, {
                method: "GET",
                credentials: "include",
                headers: defaultHeaders(),
            })
            if (!response.ok) { throw new Error(`Error: ${response.status}`)}
            return await response.json()
        } catch(e) {
            return null
        }
    },
    createTask: async (payload) => {
        const response = await fetch(`${baseUrl}/api/tasks/`, {
            method: 'POST',
            credentials: "include",
            headers: defaultHeaders(),
            body: JSON.stringify(payload),
        })
        if (!response.ok) { throw new Error(`Error: ${response.status}`)}
        const createdTask = await response.json()
        return createdTask.data
    },
    updateTask: async (taskId, payload) => {
        const response = await fetch(`${baseUrl}/api/tasks/${taskId}`, {
            method: "PATCH",
            credentials: "include",
            headers: defaultHeaders(),
            body: JSON.stringify(payload),
        })
        if (!response.ok) { throw new Error(`Error: ${response.status}`)}
        const updatedTask = await response.json()
        return updatedTask.data
    },
    destroyTask: async (taskId) => {
        const response = await fetch(`${baseUrl}/api/tasks/${taskId}`, {
            method: 'DELETE',
            credentials: "include",
            headers: defaultHeaders(),
        })
        if (!response.ok) { throw new Error(`Error: ${response.status}`)}
        return await response.json()
    }
}

export default FetchApiService