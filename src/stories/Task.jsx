import React, {useContext} from 'react'
import {TaskListContext} from "../context/TaskListContext";
import {useNavigate} from "react-router-dom";
import {Priority} from "./Priority";
import {Description} from "./Description";
import {STATUSES} from "../Utilities";

export const Task = (props) => {
    const {dispatch, actions} = useContext(TaskListContext)

    let navigate = useNavigate()

    const editTask = () => {
        dispatch({type:actions.SELECT, data:props.task})
        navigate("/edit")
    }

    const updateTaskCompleteState = (e) => {
        dispatch({type: actions.UPDATE, data:{...props.task, status:e.target.value}})
    }

    const statuses = STATUSES

    return (
        <div className="flex border rounded border-black m-2 p-2">
            <select value={props.task.status} name="status" id="status" onChange={(e)=>updateTaskCompleteState(e)}>
                {statuses.map((status)=>{
                    return (
                        <option value={status}>{status}</option>
                    )
                })}
            </select>
            <div className={"w-full"} onClick={editTask}>
                <Priority priority={props.task.priority}/>
                <Description description={props.task.description}/>
            </div>
        </div>
    )
}