import React, {useState, createContext, useEffect, useReducer} from "react";

export const TaskListContext = createContext([])

const actions = {
    UPDATE: 'update',
    CREATE: 'create',
    DELETE: 'delete'
}

export const defaultTask = {
    id:null,
    priority:1,
    description:'',
    complete: false
}

const reducer = (state,action) => {
    switch (action.type) {
        case actions.UPDATE:
            return state.map((task)=>{
                return task.id === action.data.id ? action.data : task
            })
        case actions.CREATE:
            const newTask = {...action.data, id:state.length}
            return [
                ...state, newTask
            ]
        case actions.DELETE:
            return state.filter((task)=>{
                return task.id !== action.data.id
            })
        default:
            throw 'Invalid reducer action'
    }
}

export const TaskListProvider = ({
    children
}) => {
    const [getTaskList, setTaskList] = useState([])

    const updateOrCreateTask = (taskToCreateOrUpdate) => {
        taskToCreateOrUpdate.id === null ? createNewTask(taskToCreateOrUpdate) : updateTaskInList(taskToCreateOrUpdate)
    }

    const removeTask = (taskToRemove) => {
        setTaskList(getTaskList.filter( (task) => {
            return task.id !== taskToRemove.id
        }))
    }

    const createNewTask = (taskToCreateOrUpdate) => {
        const newTask = {...taskToCreateOrUpdate, id:getTaskList.length}
        setTaskList([...getTaskList, newTask])
    }

    const [state, dispatch] = useReducer(reducer, '')

    const [getSortedTaskList, setSortedTaskList] = useState(getTaskList)

    useEffect(() => {
        setSortedTaskList(sortTaskList)
    }, [getTaskList])

    const getDefaultTask = () => {
        return {
            id:null,
            priority:1,
            description:'',
            complete: false
        }
    }

    const sortTaskList = () => {
        const descriptionSortedTaskList = () => {
            return getTaskList.sort(descriptionSort)
        }
        const prioritySortedTaskList = () => {
            return descriptionSortedTaskList().sort(prioritySort)
        }
        const completeSortedTaskList = () => {
            return prioritySortedTaskList().sort(completeSort)
        }

        return completeSortedTaskList()
    }

    const updateTaskInList = (taskToCreateOrUpdate) => {
        setTaskList(getTaskList.map((task) => {
            return task.id === taskToCreateOrUpdate.id ? taskToCreateOrUpdate : task
        }))
    }

    const updateTaskCompleteStatus = (taskId) => {
        const updatedTaskList = getTaskList.map((task)=>{
            return taskId === task.id ? {...task, complete:!task.complete} : task
        })
        setTaskList(updatedTaskList)
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

    const descriptionSort = (a,b) => {
        if(a.description>b.description) return 1
        if(a.description<b.description) return -1
        return 0
    }

    return (
        <TaskListContext.Provider value={{getTaskList, removeTask, getSortedTaskList, updateTaskCompleteStatus, updateOrCreateTask, getDefaultTask, state, dispatch, actions}}>
            {children}
        </TaskListContext.Provider>
    )
}