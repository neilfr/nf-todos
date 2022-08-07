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
            console.log('state: ', state)
            const foo = state.tasks.findIndex((task)=>{
                console.log('task.id is: ', task.id)
                console.log('action.data.data.id: ', action.data.data.id)
                return task.id === action.data.data.id})
            console.log('foo', foo)
            const newArray = state.tasks
            newArray[foo] = action.data.data
            console.log('newArray: ', newArray)
            newState = {
                ...state,
                tasks: newArray
            }
            console.log('newState:', newState)
            return newState
// return {
//                 ...state,
//     tasks: [
//         {
//             "id": 3,
//             "description": "55532452455",
//             "priority": 9,
//             "stage_id": 4,
//             "stage": "Done"
//         },
//         {
//             "id": 4,
//             "description": "iiiii",
//             "priority": 2,
//             "stage_id": 2,
//             "stage": "To Do"
//         }
//     ]
// }
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
