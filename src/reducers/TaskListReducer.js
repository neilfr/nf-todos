import {defaultTask} from "../context/TaskListContext";

export const actions = {
    INIT_TASKS: 'init_tasks',
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
        case actions.INIT_TASKS:
            newState = {
                ...state,
                tasks:action.data.tasks
            }
            return newState
        case actions.UPDATE:
            // give it things it needs for new state.  pass it the things it needs from the response.?
            // make a service for doing the db updates... then call it from the reducer

            // change to async await....

            // wait(2000).then(()=>{
            //     console.log('foo', newState)
            //     return newState
            // })
            console.log('got here! with: ',action.data)
            newState = {
                ...state,
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
                currentTask:defaultTask
            }
            return newState
        case actions.DELETE:
            newState = {
                ...state,
                tasks:state.tasks.filter((task) => task.id !== action.data.id),
                currentTask:defaultTask
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
