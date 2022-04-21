import MainPage from "../pages/MainPage"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {EditTaskPage} from "../pages/EditTaskPage"
import React, {useState} from "react";
import {TaskContext} from "../context/TaskContext";
import {TaskListContext} from "../context/TaskListContext";


const Base = () => {
    const [getTask, setTask] = useState(null)
    const [getTaskList2, setTaskList2] = useState([])

    const updateTaskList = (updatedTask) => {
        //sort here
        const taco = getTaskList2.map((task)=>{
            return task.id === updatedTask.id ? updatedTask : task
        })
        console.log('taco', taco)
        const sortedTaco = taco.length>0 ? taco.sort(prioritySort) : taco
        console.log('sortedTaco', sortedTaco)

        setTaskList2(sortedTaco)
    }

    //todo: sorting like strings instead of integers
    const prioritySort = (a,b) => {
        if(a.priority>b.priority) return 1
        if(a.priority<b.priority) return -1
        return 0
    }

    const descriptionSort = (a,b) => {
        if(a.description>b.description) return 1
        if(a.description<b.description) return -1
        return 0
    }

    return (
        <TaskListContext.Provider value={{getTaskList2, setTaskList2, updateTaskList}}>
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