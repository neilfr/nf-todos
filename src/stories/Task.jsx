import React, {useContext, useState} from 'react'
import {TaskListContext} from "../context/TaskListContext";
import {useNavigate} from "react-router-dom";

export const Task = (props) => {
    const {updateTaskCompleteStatus} = useContext(TaskListContext)

    let navigate = useNavigate()

    const editTask = (task) => {
        navigate("/edit", {state:{task}})
    }

    return (
        <div className="flex border rounded border-black m-2 p-2">
            <input type={"checkbox"} checked={props.task.complete} onChange={()=>updateTaskCompleteStatus(props.task.id)}/>
            <div className={"bg-red-500 w-full"} onClick={()=>{editTask(props.task)}}>
                <span>{props.task.priority}</span>
                <span>{props.task.description}</span>
            </div>
        </div>
    )
}


