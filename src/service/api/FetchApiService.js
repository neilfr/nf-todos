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

const defaultHeaders = {
    'X-XSRF-TOKEN': getXSRFToken(),
    "Content-Type": "application/json",
    "Accept": 'application/json,text/plain,*/*',
    "X-Requested-With": "XMLHttpRequest"
};

const tacos = async (url, init) => {
    const mergedHeaders = (init && init.headers) ? {...defaultHeaders, ...init.headers} : {}
    const mergedInit = init ? {
        credentials: "include",
        ...init,
        headers: {...defaultHeaders, ...mergedHeaders},
    } : {}
    console.log('url:',url,'mergedInit:', mergedInit)
    await fetch(baseUrl + url, mergedInit)
}

const FetchApiService = {
    getCsrf : async () => {
        const csrf = await fetch(`${baseUrl}/sanctum/csrf-cookie`,{
            method: "GET",
            credentials: "include",
        })
        console.log('fetch, csrf =', csrf)
        return csrf
    },
    login : async (email, password) => {
        await tacos('/login',{
            method: 'POST',
            body:JSON.stringify({
                email: email,
                password: password
            })})
    },
    logout : async () => {
        await tacos('/logout',{
            method: 'POST',
        })
    },
    getUser : async () => {
        // const user = await tacos('/api/user',{})
        const user = await fetch(`${baseUrl}/api/user`,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    'X-XSRF-TOKEN': getXSRFToken(),
                    "Content-Type": "application/json",
                    "Accept":'application/json,text/plain,*/*',
                    "X-Requested-With": "XMLHttpRequest"
                },
            })
        console.log('user =', user)
    },
    getStages: async () => {
        const response = await fetch(`${baseUrl}/api/stages`,{
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
        const response = await fetch(`${baseUrl}/api/tasks/`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'X-XSRF-TOKEN': getXSRFToken(),
                "Content-Type": "application/json",
                "Accept":'application/json,text/plain,*/*',
                "X-Requested-With": "XMLHttpRequest"            },
            body: JSON.stringify(payload),
        })
        if (!response.ok) { throw new Error(`Error: ${response.status}`)}
        const createdTask = await response.json()
        return createdTask.data
    },
    getTasks: async () => {
        try {
            const response = await fetch(`${baseUrl}/api/tasks`, {
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
        const response = await fetch(`${baseUrl}/api/tasks/${taskId}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                'X-XSRF-TOKEN': getXSRFToken(),
                "Content-Type": "application/json",
                "Accept":'application/json,text/plain,*/*',
                "X-Requested-With": "XMLHttpRequest"              },
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
            headers: {
                'X-XSRF-TOKEN': getXSRFToken(),
                "Content-Type": "application/json",
                "Accept":'application/json,text/plain,*/*',
                "X-Requested-With": "XMLHttpRequest"
            },
        })
        if (!response.ok) { throw new Error(`Error: ${response.status}`)}
        return await response.json()
    }
}

export default FetchApiService