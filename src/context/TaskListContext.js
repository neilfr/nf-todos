import React, {useState, createContext} from "react";

export const TaskListContext = createContext([])

export const TaskListProvider = ({
    children
}) => {
    const [getTaskList, setTaskList] = useState([
        {
            id:0,
            priority:1,
            description:'first task',
            complete: false
        },
        {
            id:1,
            priority:2,
            description:'second task',
            complete: true
        }
    ])

    const defaultTask = {
        id:null,
        priority:1,
        description:'',
        complete: false
    }

    const newTask = () => {
        return defaultTask
    }

    const updateOrCreateTask = (taskToCreateOrUpdate) => {
        taskToCreateOrUpdate.id === null ? createNewTask(taskToCreateOrUpdate) : updateTaskInList(taskToCreateOrUpdate)
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

    const sortTaskList = () => {
        // const descriptionSortedUpdatedTaskList = tl.length>0 ? tl.sort(descriptionSort) : tl
        // const prioritySortedUpdatedTaskList = descriptionSortedUpdatedTaskList.length>0 ? descriptionSortedUpdatedTaskList.sort(prioritySort) : descriptionSortedUpdatedTaskList
        // return prioritySortedUpdatedTaskList.length>0 ? prioritySortedUpdatedTaskList.sort(statusSort) : prioritySortedUpdatedTaskList
        return getTaskList.length>0 ? setTaskList(getTaskList.sort(prioritySort)) : []
    }

    const statusSort = (a,b) => {
        if(a.status>b.status) return 1
        if(a.status<b.status) return -1
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
        <TaskListContext.Provider value={{tasks:getTaskList, updateTaskCompleteStatus, updateOrCreateTask, newTask}}>
            {children}
        </TaskListContext.Provider>
    )
}