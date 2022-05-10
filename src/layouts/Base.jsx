import React from "react";
import {TaskListProvider} from "../context/TaskListContext";
import {TaskList} from "../stories/TaskList";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import {TaskForm} from "../components/TaskForm";


const Base = () => {

    return (
        <TaskListProvider>
            <BrowserRouter>
                <Routes>
                    <Route path = "/" element={<TaskList/>}/>
                    <Route path = "/edit" element={<TaskForm/>}/>
                </Routes>
            </BrowserRouter>
        </TaskListProvider>
    )
}
export default Base