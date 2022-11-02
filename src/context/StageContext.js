import React, {createContext, useContext, useEffect, useReducer} from 'react'
import {StageReducer} from "../reducers/StageReducer";
import {ApiContext} from "./ApiContext";

export const StageContext = createContext('')

export const actions = {
    INIT_STAGES: 'init_stages',
}

export const StageProvider = ({children}) => {
    const {getStages} = useContext(ApiContext)

    const [state, dispatch] = useReducer(StageReducer, undefined, ()=>{
        return {}
    })

    useEffect(async () => {
        const stages = await getStages()
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