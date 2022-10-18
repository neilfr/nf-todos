import axios from "axios";

export const StageApiService = {
    getStagesAxios: async ()=> {
        const response = await axios.get("http://localhost:8000/api/stages")
        return response.data
    },

    getStages: async () => {
        const response = await fetch("http://localhost:8000/api/stages",)
        if (!response.ok) { throw new Error(`Error: ${response.status}`)}
        return await response.json()
    }

}