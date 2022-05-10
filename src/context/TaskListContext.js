import React, {useState, createContext, useEffect} from "react";

export const TaskListContext = createContext([])

export const TaskListProvider = ({
    children
}) => {
    const [getTaskList, setTaskList] = useState([])

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
        <TaskListContext.Provider value={{getTaskList, removeTask, getSortedTaskList, updateTaskCompleteStatus, updateOrCreateTask, getDefaultTask}}>
            {children}
        </TaskListContext.Provider>
    )
}