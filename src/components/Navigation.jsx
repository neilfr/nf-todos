import React from 'react'
import {Route, Routes, useNavigate} from "react-router";
import {TaskList} from "./TaskList";
import {TaskForm} from "./TaskForm";

export const Navigation = () => {

    let navigate = useNavigate()
    const editTask = () => {
        navigate("/edit")
    }
    return (
        <Routes>
            <Route path = "/" element={<TaskList editTask={editTask}/>}/>
            <Route path = "/edit" element={<TaskForm/>}/>
        </Routes>
    )
}