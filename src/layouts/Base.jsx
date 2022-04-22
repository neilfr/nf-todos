import MainPage from "../pages/MainPage"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {EditTaskPage} from "../pages/EditTaskPage"
import React, {useState} from "react";
import {TaskContext} from "../context/TaskContext";
import {TaskListContext} from "../context/TaskListContext";


const Base = () => {
    const [getTask, setTask] = useState(null)
    const [getTaskList, setTaskList] = useState([])

    const updateTaskList = (updatedTask) => {
        const updatedTaskList = getTaskList.map((task)=>{
            return task.id === updatedTask.id ? updatedTask : task
        })

        const descriptionSortedUpdatedTaskList = updatedTaskList.length>0 ? updatedTaskList.sort(descriptionSort) : updatedTaskList
        const prioritySortedUpdatedTaskList = descriptionSortedUpdatedTaskList.length>0 ? descriptionSortedUpdatedTaskList.sort(prioritySort) : descriptionSortedUpdatedTaskList
        const statusSortedUpdatedTaskList = prioritySortedUpdatedTaskList.length>0 ? prioritySortedUpdatedTaskList.sort(statusSort) : prioritySortedUpdatedTaskList

        setTaskList(statusSortedUpdatedTaskList)
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
        <TaskListContext.Provider value={{getTaskList, setTaskList, updateTaskList}}>
            <TaskContext.Provider value={{getTask, setTask}}>
                <div className="base-layout">
                    <h1 className="bg-red">Base Layout Header</h1>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/edit" element={<EditTaskPage/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            </TaskContext.Provider>
        </TaskListContext.Provider>
    )
}
export default Base