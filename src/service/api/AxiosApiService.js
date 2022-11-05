import axios from "axios"

const AxiosApiService = {
    getCsrf : async () => {
        const csrf = await axios.get('http://localhost:8000/sanctum/csrf-cookie')
        console.log('csrf =', csrf)
    },
    getStages : async () => {
        const response = await axios.get("http://localhost:8000/api/stages",{
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            withCredentials: true,
        })
        return response.data
    },
    updateTask : async (taskId, payload) => {
        const updatedTask = await axios.patch(`http://localhost:8000/api/tasks/${taskId}`,
            payload,
            {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
                withCredentials: true,
            })
        return updatedTask.data.data
    },
    destroyTask : async (taskId) => {
        const response = await axios.delete(`http://localhost:8000/api/tasks/${taskId}`, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            withCredentials: true,
        })
        return response.data.data
    },
    createTask : async (payload) => {
        const createdTask = await axios.post(`http://localhost:8000/api/tasks/`,
            payload, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
                withCredentials: true,
            })
        return createdTask.data.data
    },
    getTasks : async () => {
        const response = await axios.get("http://localhost:8000/api/tasks", {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            withCredentials: true,
        })
        return response.data
    },
    login : async (email, password) => {
        await axios.post('http://localhost:8000/login', {
            email: email,
            password: password,
        }, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            withCredentials: true,
        })
    },
    logout : async () => {
        await axios.post('http://localhost:8000/logout',
            null,
            {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
                withCredentials: true,
            })
    },
    getUser : async () => {
        const user = await axios.get('http://localhost:8000/api/user',
            {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
                withCredentials: true,
            })
        console.log('user =', user)
    }
}

export default AxiosApiService