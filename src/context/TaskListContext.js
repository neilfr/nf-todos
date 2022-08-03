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

        return {
            tasks:[],
            currentTask: {}
        }
    })

    console.log('tasklist provider state: ',state)
    // useEffect(()=>{
    //     dispatch({type:actions.INIT_TASKS})
    // },[])
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