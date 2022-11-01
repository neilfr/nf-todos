import React from 'react'
import {Route, Routes, useNavigate} from "react-router";
import {TaskList} from "./TaskList";
import {TaskForm} from "./TaskForm";
import {Login} from "../pages/Login";

export const Navigation = () => {

    let navigate = useNavigate()
    const editTask = () => {
        navigate("/edit")
    }
    return (
        <Routes>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/"} element={<Login/>}/>
            <Route path = "/tasks" element={<TaskList editTask={editTask}/>}/>
            <Route path = "/edit" element={<TaskForm/>}/>
        </Routes>
    )
}