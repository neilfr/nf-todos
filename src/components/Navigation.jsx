import React from 'react'
import {Route, Routes, useNavigate} from "react-router";
import {TaskList} from "./TaskList";
import {TaskForm} from "./TaskForm";
import {Login} from "../pages/Login";
import RouteGuard from "./RouteGuard";

export const Navigation = () => {

    let navigate = useNavigate()
    const editTask = () => {
        navigate("/edit")
    }
    return (
        <Routes>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/"} element={<Login/>}/>
            <Route path = "/tasks" element={<RouteGuard requiredRoles={['admin']}><TaskList editTask={editTask}/></RouteGuard>}/>
            <Route path = "/edit" element={<RouteGuard requiredRoles={['admin']}><TaskForm/></RouteGuard>}/>
        </Routes>
    )
}