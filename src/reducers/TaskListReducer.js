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
            console.log('in actions.update with:', action.data)

            fetch(`http://localhost:8000/api/tasks/${action.data.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(action.data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                    newState = {
                        ...state,
                        tasks:state.tasks.map( (task) => task.id === action.data.id ? {...task, ...action.data} : task)
                            .sort(descriptionSort).sort(prioritySort).sort(completeSort),
                        currentTask:defaultTask
                    }
                    return newState
                })
                .catch((error) => {
                    console.error('Error:', error);
                });


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
