import React, {createContext, useReducer} from "react";

export const TaskListContext = createContext('')

const actions = {
    UPDATE: 'update',
    CREATE: 'create',
    DELETE: 'delete'
}

export const defaultTask = {
    id:null,
    priority:'1',
    description:'',
    complete: false
}

const descriptionSort = (a,b) => {
    if(a.description>b.description) return 1
    if(a.description<b.description) return -1
    return 0
}

const completeSort = (a,b) => {
    if(a.complete>b.complete) return 1
    if(a.complete<b.complete) return -1
    return 0
}

const prioritySort = (a, b) => {
    if(parseInt(a.priority)>parseInt(b.priority)) return 1
    if(parseInt(a.priority)<parseInt(b.priority)) return -1
    return 0
}

const reducer = (state,action) => {
    switch (action.type) {
        case actions.UPDATE:
            return {
                ...state,
                tasks:state.tasks.map( (task) => task.id === action.data.id ? action.data : task)
                    .sort(descriptionSort).sort(prioritySort).sort(completeSort)
            }
        case actions.CREATE:
            return {
                nextTaskId:state.nextTaskId+1,
                tasks:[
                    ...state.tasks,
                    {
                        ...action.data,
                        id:state.nextTaskId
                    }
                ].sort(descriptionSort).sort(prioritySort).sort(completeSort)
            }
        case actions.DELETE:
            return {
                ...state,
                tasks:state.tasks.filter((task) => task.id !== action.data.id)
            }
        default:
            throw 'Invalid reducer action'
    }
}

export const TaskListProvider = ({
    children
}) => {
    const [state, dispatch] = useReducer(reducer, undefined, ()=>{
        const initialState = {
            nextTaskId: 0,
            tasks: []
        }
        console.log('got here', {
            nextTaskId: localStorage.getItem('nextTaskId'),
            tasks:localStorage.getItem('tasks')
        })
        if(!localStorage.getItem('nextTaskId'))
            return initialState
        return {
            nextTaskId: localStorage.getItem('nextTaskId'),
            tasks:localStorage.getItem('tasks')
        }
        // return JSON.parse(localStorage.getItem('tasks'))
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
        <TaskListContext.Provider value={{getDefaultTask, tasks:state.tasks, dispatch, actions}}>
            {children}
        </TaskListContext.Provider>
    )
}