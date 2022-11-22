import React, {createContext} from 'react'
import AxiosApiService from "../service/api/AxiosApiService";
import FetchApiService from "../service/api/FetchApiService";

export const ApiContext = createContext()

export const ApiProvider = ({children}) => {

    const fetchApiService = FetchApiService
    const axiosApiService = AxiosApiService

    return(
        <ApiContext.Provider value={{
            apiService:AxiosApiService
        }}>
            {children}
        </ApiContext.Provider>
    )
}