import {actions} from "../context/StageContext";

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