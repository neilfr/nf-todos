import MainPage from "../pages/MainPage"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {EditTaskPage} from "../pages/EditTaskPage"
import React, {useState} from "react";
import {CurrentTaskIdContext} from "../context/CurrentTaskIdContext";
import {TaskListContext} from "../context/TaskListContext";

const Base = () => {
    const [getCurrentTaskId, setCurrentTaskId] = useState(null)
    const [getTaskList2, setTaskList2] = useState([])

    return (
        <TaskListContext.Provider value={{getTaskList2, setTaskList2}}>
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