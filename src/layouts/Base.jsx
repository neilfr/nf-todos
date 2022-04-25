import MainPage from "../pages/MainPage"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {EditTaskPage} from "../pages/EditTaskPage"
import React, {useState} from "react";
import {TaskContext} from "../context/TaskContext";
import {TaskListContext} from "../context/TaskListContext";


const Base = () => {
    const [getTask, setTask] = useState(null)
    const [getTaskList, setTaskList] = useState([])

    const sortTaskList = (tl) => {
        const descriptionSortedUpdatedTaskList = tl.length>0 ? tl.sort(descriptionSort) : tl
        const prioritySortedUpdatedTaskList = descriptionSortedUpdatedTaskList.length>0 ? descriptionSortedUpdatedTaskList.sort(prioritySort) : descriptionSortedUpdatedTaskList
        return prioritySortedUpdatedTaskList.length>0 ? prioritySortedUpdatedTaskList.sort(statusSort) : prioritySortedUpdatedTaskList
    }

    const updateTaskList = (updatedTask) => {
        const updatedTaskList = getTaskList.map((task)=>{
            return task.id === updatedTask.id ? updatedTask : task
        })

        setTaskList(sortTaskList(updatedTaskList))
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
        <TaskListContext.Provider value={{getTaskList, setTaskList, updateTaskList, sortTaskList}}>
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