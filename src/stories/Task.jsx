import React, {useContext} from 'react'
import {TaskListContext} from "../context/TaskListContext";

export const Task = (props) => {
    const {updateTaskCompleteStatus, editTask} = useContext(TaskListContext)
    return (
        <div className="flex border rounded border-black m-2 p-2">
            <input type={"checkbox"} checked={props.task.complete} onChange={()=>updateTaskCompleteStatus(props.task.id)}/>
            <div onClick={()=>{editTask(props.task)}}>
                <span>{props.task.priority}</span>
                <span>{props.task.description}</span>
            </div>
        </div>
    )
}


