import React, {createContext, useEffect, useReducer} from 'react'
import {StageApiService} from "../service/api/StageApiService";
import {StageReducer} from "../reducers/StageReducer";
import axios from "axios";

export const StageContext = createContext('')

export const actions = {
    INIT_STAGES: 'init_stages',
}

export const StageProvider = ({children}) => {

    const [state, dispatch] = useReducer(StageReducer, undefined, ()=>{
        return {}
    })
    useEffect(async () => {
        const stages = await StageApiService.getStagesAxios()
        // const stages = await StageApiService.getStages()
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