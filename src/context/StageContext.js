import React, {createContext, useEffect, useReducer} from 'react'

export const StageContext = createContext('')

export const actions = {
    INIT_STAGES: 'init_stages',
}

export const StageReducer = (state, action) => {
    let newState = {}

    switch (action.type) {
        case actions.INIT_STAGES:
            newState = {
                ...state,
                stages:action.data.stages
            }
            return newState
        default:
            throw new Error('Invalid stage reducer action')
    }
}

export const StageProvider = ({children}) => {
    const [state, dispatch] = useReducer(StageReducer, undefined, ()=>{
        return {}
    })
    useEffect(()=>{
        fetch("http://localhost:8000/api/stages",)
            .then(response => response.json())
            .then(stages=>{
                dispatch({
                    type:actions.INIT_STAGES,
                    data:{"stages":stages}
                })
            });
        }, [])

    return (
        <StageContext.Provider value={{stages:state.stages}}>
            {children}
        </StageContext.Provider>
    )
}