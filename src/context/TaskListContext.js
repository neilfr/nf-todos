import React, {createContext, useEffect, useReducer} from "react";
import {actions, TaskListReducer} from "../reducers/TaskListReducer";
import {DEFAULT_STAGE_ID} from "../Utilities";
import {getTasks, updateTask} from "../service/ApiService";
import {useNavigate} from "react-router-dom";

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

    const updateTaskStage = async (task_id, stage_id) => {
        const task = await updateTask(task_id, {stage_id:stage_id})
        dispatch({type: actions.UPDATE, data:task})
    }

    let navigate = useNavigate()

    const editTask = (task) => {
        dispatch({type:actions.SELECT, data:task})
        navigate("/edit")
    }

    useEffect( async () => {
        const tasks = await getTasks()
        dispatch({
            type:actions.INITIALIZE,
            data:{"tasks":tasks}
        })
    },[])

    return (
        <TaskListContext.Provider value={{updateTaskStage, editTask, tasks:state.tasks, currentTask:state.currentTask, dispatch, actions}}>
            {children}
        </TaskListContext.Provider>
    )
}