import React, {createContext, useReducer} from "react";
import {actions, TaskListReducer} from "../reducers/TaskListReducer";
import {DEFAULT_STAGE} from "../Utilities";

export const TaskListContext = createContext('')

export const defaultTask = {
    id:null,
    priority:'1',
    description:'',
    stage: DEFAULT_STAGE
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

        fetch("http://localhost:8000/api/tasks",{
            // headers : {
            //     'Content-Type': 'application/json',
            //     'Accept': 'application/json'
            // }
        })
            .then(response => response.json())
            .then(data=>console.log(data));

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
            stage: DEFAULT_STAGE
        }
    }

    return (
        <TaskListContext.Provider value={{getDefaultTask, tasks:state.tasks, currentTask:state.currentTask, dispatch, actions}}>
            {children}
        </TaskListContext.Provider>
    )
}