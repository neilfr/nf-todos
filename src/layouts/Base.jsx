import React from "react";
import {TaskListProvider} from "../context/TaskListContext";
import {BrowserRouter} from "react-router-dom";
import {Navigation} from "../components/Navigation";


const Base = () => {

    return (
        <TaskListProvider>
            <BrowserRouter>
                <Navigation/>
            </BrowserRouter>
        </TaskListProvider>
    )
}
export default Base