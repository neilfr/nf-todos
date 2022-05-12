import React, {useContext} from 'react'
import {TaskListContext} from "../context/TaskListContext";
import {useNavigate} from "react-router-dom";
import {Priority} from "./Priority";
import {Description} from "./Description";

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
                <Priority priority={props.task.priority}/>
                <Description description={props.task.description}/>
            </div>
        </div>
    )
}