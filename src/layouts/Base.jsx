import React from "react";
import {TaskListProvider} from "../context/TaskListContext";
import {BrowserRouter} from "react-router-dom";
import {Navigation} from "../components/Navigation";
import {StageProvider} from "../context/StageContext";


const Base = () => {

    return (
        <StageProvider>
            <TaskListProvider>
                <BrowserRouter>
                    <Navigation/>
                </BrowserRouter>
            </TaskListProvider>
        </StageProvider>
    )
}
export default Base