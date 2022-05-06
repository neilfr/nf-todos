import React from 'react'
import {useLocation} from "react-router-dom";

export const Foo = () => {

    const location = useLocation()
    const task = location.state.task
    const updateTaskPriority = () => {
        console.log("update task priority")
    }

    const updateTaskDescription = () => {
        console.log("update task description")
    }

    return (
        <div>
            <div>
                <label htmlFor={"priority"}>Priority: </label>
                <input id="priority" type={"number"} min={"0"} value={task.priority} onChange={updateTaskPriority}/>
            </div>
            <div>
                <label htmlFor={"description"}>Description: </label>
                <input id="description" type={"text"} value={task.description} onChange={updateTaskDescription}/>
            </div>
        </div>
    )
}