import {defaultTask} from "../context/TaskListContext";

export const actions = {
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

    const persistState = () => {
        localStorage.setItem('nextTaskId', JSON.stringify(newState.nextTaskId))
        localStorage.setItem('tasks', JSON.stringify(newState.tasks))
        localStorage.setItem('currentTask', JSON.stringify(newState.currentTask))
    }

    switch (action.type) {
        case actions.UPDATE:
            newState = {
                ...state,
                tasks:state.tasks.map( (task) => task.id === action.data.id ? action.data : task)
                    .sort(descriptionSort).sort(prioritySort).sort(completeSort),
                currentTask:defaultTask
            }
            persistState();
            return newState
        case actions.CREATE:
            newState = {
                nextTaskId:parseInt(state.nextTaskId)+1,
                tasks:[
                    ...state.tasks,
                    {
                        ...action.data,
                        id:state.nextTaskId
                    }
                ].sort(descriptionSort).sort(prioritySort).sort(completeSort),
                currentTask:defaultTask
            }
            persistState();
            return newState
        case actions.DELETE:
            newState = {
                ...state,
                tasks:state.tasks.filter((task) => task.id !== action.data.id),
                currentTask:defaultTask
            }
            persistState();
            return newState
        case actions.SELECT:
            newState = {
                ...state,
                currentTask:action.data
            }
            persistState();
            return newState
        case actions.NEW:
            newState = {
                ...state,
                currentTask:defaultTask
            }
            persistState()
            return newState
        default:
            throw new Error('Invalid reducer action')
    }
}
