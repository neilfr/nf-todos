import React, {createContext, useReducer} from "react";
import {actions, TaskListReducer} from "../reducers/TaskListReducer";

export const TaskListContext = createContext('')

export const defaultTask = {
    id:null,
    priority:'1',
    description:'',
    complete: false
}

export const TaskListProvider = ({
    children
}) => {
    const [state, dispatch] = useReducer(TaskListReducer, undefined, ()=>{
        const initialState = {
            nextTaskId: 0,
            tasks: [],
            currentTask: defaultTask
        }
        if(!localStorage.getItem('tasks') || JSON.parse(localStorage.getItem('tasks')).length < 1 )
            return initialState
        return {
            nextTaskId: localStorage.getItem('nextTaskId'),
            tasks:JSON.parse(localStorage.getItem('tasks')),
            currentTask: JSON.parse(localStorage.getItem('currentTask'))
        }
    })

    const getDefaultTask = () => {
        return {
            id:null,
            priority:1,
            description:'',
            complete: false
        }
    }

    return (
        <TaskListContext.Provider value={{getDefaultTask, tasks:state.tasks, currentTask:state.currentTask, dispatch, actions}}>
            {children}
        </TaskListContext.Provider>
    )
}