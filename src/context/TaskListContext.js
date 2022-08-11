import React, {createContext, useEffect, useReducer} from "react";
import {actions, TaskListReducer} from "../reducers/TaskListReducer";
import {DEFAULT_STAGE_ID} from "../Utilities";
import {getTasks, updateTask} from "../service/ApiService";

export const TaskListContext = createContext('')

export const defaultTask = {
    id:null,
    priority:'1',
    description:'',
    stage_id: DEFAULT_STAGE_ID
}

export const TaskListProvider = ({
    children
}) => {
    const [state, dispatch] = useReducer(TaskListReducer, {
        tasks:[],
        currentTask: {}
    })

    // moved here from Task.jsx
    const updateTaskCompleteState = async (task_id, stage_id) => {
        const task = await updateTask(task_id, {stage_id:stage_id})
        dispatch({type: actions.UPDATE, data:task})
    }

    useEffect( async () => {
        const tasks = await getTasks()
        dispatch({
            type:actions.INITIALIZE,
            data:{"tasks":tasks}
        })
    },[])

    return (
        <TaskListContext.Provider value={{updateTaskCompleteState, tasks:state.tasks, currentTask:state.currentTask, dispatch, actions}}>
            {children}
        </TaskListContext.Provider>
    )
}