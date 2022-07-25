import React, {createContext, useEffect, useReducer} from "react";
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

        return {
            nextTaskId: localStorage.getItem('nextTaskId'),
            tasks:JSON.parse(localStorage.getItem('tasks')),
            currentTask: JSON.parse(localStorage.getItem('currentTask'))
        }
    })

    useEffect(()=>{
        fetch("http://localhost:8000/api/tasks",)
            .then(response => response.json())
            .then(tasks=>{
                console.log('inside useEffect the tasks data is', tasks)
                dispatch({
                    type:actions.INIT_TASKS,
                    data:{"tasks":tasks}
                })
            });
    },[])


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