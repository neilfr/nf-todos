import MainPage from "../pages/MainPage"
import {BrowserRouter, Routes, Route, useNavigate, useHistory} from "react-router-dom"
import {EditTaskPage} from "../pages/EditTaskPage"
import React, {useState} from "react";
import {CurrentTaskIdContext} from "../context/CurrentTaskIdContext";
import {TaskListContext} from "../context/TaskListContext";


const Base = () => {
    const [getCurrentTaskId, setCurrentTaskId] = useState(null)
    const [getTaskList2, setTaskList2] = useState([])

    // put update here and pass it via the provider.  then task form runs the function there.
    // update state of tasklistcontext here.

    const updateTaskList = (updatedTask) => {
        //sort here
        console.log('updated task', updatedTask)
        setTaskList2(getTaskList2.map((task)=>{
            return task.id === updatedTask.id ? updatedTask : task
        }))
    }

    return (
        <TaskListContext.Provider value={{getTaskList2, setTaskList2, updateTaskList}}>
            <CurrentTaskIdContext.Provider value={{getCurrentTaskId, setCurrentTaskId}}>
                <div className="base-layout">
                    <h1 className="bg-red">Base Layout Header</h1>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/edit" element={<EditTaskPage/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            </CurrentTaskIdContext.Provider>
        </TaskListContext.Provider>
    )
}
export default Base