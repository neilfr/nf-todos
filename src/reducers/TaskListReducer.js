import {defaultTask} from "../context/TaskListContext";

export const actions = {
    INITIALIZE: 'initialize',
    UPDATE: 'update',
    CREATE: 'create',
    DELETE: 'delete',
    SELECT: 'select',
    NEW: 'new'
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

export const TaskListReducer = (state,action) => {
    let newState = {}

    switch (action.type) {
        case actions.INITIALIZE:
            newState = {
                ...state,
                tasks:action.data.tasks,
                currentTask:{}
            }
            return newState
        case actions.UPDATE:
            const taskToBeReplacedIndex = state.tasks.findIndex((task)=>{
                return task.id === action.data.id})
            const newTaskArray = state.tasks
            newTaskArray[taskToBeReplacedIndex] = action.data
            newState = {
                ...state,
                tasks: newTaskArray,
                currentTask:{}
            }
            return newState
        case actions.CREATE:
            newState = {
                tasks:[
                    ...state.tasks,
                    {
                        ...action.data,
                    }
                ].sort(descriptionSort).sort(prioritySort).sort(completeSort),
                currentTask:{}
            }
            return newState
        case actions.DELETE:
            newState = {
                ...state,
                tasks:state.tasks.filter((task) => task.id !== action.data.id),
                currentTask:{}
            }
            return newState
        case actions.SELECT:
            newState = {
                ...state,
                currentTask:action.data
            }
            return newState
        case actions.NEW:
            newState = {
                ...state,
                currentTask:defaultTask
            }
            return newState
        default:
            throw new Error('Invalid task list reducer action')
    }
}
