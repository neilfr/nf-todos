import React, {useContext} from 'react'
import {TaskListContext} from "../context/TaskListContext";
import {useNavigate} from "react-router-dom";
import {Priority} from "./Priority";
import {Description} from "./Description";

export const Task = (props) => {
    const {dispatch, actions} = useContext(TaskListContext)

    let navigate = useNavigate()

    const editTask = () => {
        dispatch({type:actions.SELECT, data:props.task})
        navigate("/edit")
    }

    const updateTaskCompleteState = (e) => {
        dispatch({type: actions.UPDATE, data:{...props.task, complete:!(e.target.value == "false")}})
    }

    return (
        <div className="flex border rounded border-black m-2 p-2">
            <select value={props.task.complete} name="status" id="status" onChange={(e)=>updateTaskCompleteState(e)}>
                <option value="true">Completed</option>
                <option value="false">not</option>
            </select>
            <div className={"w-full"} onClick={editTask}>
                <Priority priority={props.task.priority}/>
                <Description description={props.task.description}/>
            </div>
        </div>
    )
}