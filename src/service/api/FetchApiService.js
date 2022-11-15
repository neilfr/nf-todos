function getXSRFToken() {
    if (! document.cookie) {
        return null
    }

    const cookies = document.cookie.split(';');
    const xsrfCookie = cookies.filter((cookie)=>{
        if (cookie.includes('XSRF-TOKEN')) return cookie
    })

    const token = xsrfCookie[0].split('=')[1]
    return token
}

const baseUrl = 'http://localhost:8000'
const tacos = (url, init) => fetch(baseUrl + url, {
    headers: {
        'X-CSRF-TOKEN': getXSRFToken(),
        "X-Requested-With": "XMLHttpRequest",
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(init.headers || {}),
    },
    ...init,
})



const FetchApiService = {
    getCsrf : async () => {
        const csrf = await tacos('/sanctum/csrf-cookie',{
            credentials: "include"
        })
        console.log('fetch, csrf =', csrf)
        return csrf
    },
    login : async (email, password) => {
        // console.log('token is:',getXSRFToken())
        await tacos('/login', {
            method: 'POST',
            mode: 'cors',
            credentials: "include",
            // headers: {
            //     "Content-Type": "application/json",
            //     "Accept":'application/json'
            // },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
    },
    logout : async () => {
        await tacos('/logout',{
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            }
        })
    },
    getUser : async () => {
        const user = await tacos('/api/user',
            {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
                withCredentials: true,
            })
        console.log('user =', user)
    },
    getStages: async () => {
        const response = await tacos("/api/stages",{
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
        const response = await tacos(`/api/tasks/`, {
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
            const response = await tacos("/api/tasks", {
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
        const response = await tacos(`/api/tasks/${taskId}`, {
            method: "PATCH",
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
        const response = await tacos(`/api/tasks/${taskId}`, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        })
        if (!response.ok) { throw new Error(`Error: ${response.status}`)}
        return await response.json()
    }
}

export default FetchApiService