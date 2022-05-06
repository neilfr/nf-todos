import React, {useState, createContext} from "react";

export const TaskListContext = createContext()

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

    const updateTaskCompleteStatus = (taskId) => {
        const updatedTaskList = getTaskList.map((task)=>{
            return taskId === task.id ? {...task, complete:!task.complete} : task
        })
        setTaskList(updatedTaskList)
    }

    return (
        <TaskListContext.Provider value={{tasks:getTaskList, updateTaskCompleteStatus}}>
            {children}
        </TaskListContext.Provider>
    )
}