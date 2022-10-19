import React, {createContext, useEffect, useReducer} from 'react'
import {StageReducer} from "../reducers/StageReducer";
// import {AxiosApiService} from "../service/api/AxiosApiService";
import FetchApiService from "../service/api/FetchApiService";

export const StageContext = createContext('')

export const actions = {
    INIT_STAGES: 'init_stages',
}

export const StageProvider = ({children}) => {

    const [state, dispatch] = useReducer(StageReducer, undefined, ()=>{
        return {}
    })
    useEffect(async () => {
        // const stages = await AxiosApiService.getStagesAxios()
        const stages = await FetchApiService.getStages()
        dispatch({
            type:actions.INIT_STAGES,
            data:{"stages":stages}
        })
    }, [])

    return (
        <StageContext.Provider value={{stages:state.stages}}>
            {children}
        </StageContext.Provider>
    )
}