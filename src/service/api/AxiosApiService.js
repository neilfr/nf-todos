import axios from "axios"

const AxiosApiService = {
    getCsrf : async () => {
        const csrf = await axios.get('http://localhost:8000/sanctum/csrf-cookie')
        return csrf
    },
    login : async (email, password) => {
        const res = await axios.post('http://localhost:8000/login', {
            email: email,
            password: password,
        }, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            withCredentials: true,
        })
        return res.status === 200 ? true:false
    },
    logout : async () => {
        const res = await axios.post('http://localhost:8000/logout',
            null,
            {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
                withCredentials: true,
            })
        return res.status === 204 ? true:false

    },
    getUser : async () => {
        const user = await axios.get('http://localhost:8000/api/user',
            {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
                withCredentials: true,
            })
        return user.data
    },
    getStages : async () => {
        const response = await axios.get("http://localhost:8000/api/stages",{
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            withCredentials: true
        })
        return response.data
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
    }
}

export default AxiosApiService