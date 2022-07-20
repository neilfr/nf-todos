import React, {useContext} from 'react'
import {TaskListContext} from "../context/TaskListContext";
import {useNavigate} from "react-router-dom";
import {Priority} from "./Priority";
import {Description} from "./Description";
import {STAGES} from "../Utilities";

export const Task = (props) => {
    const {dispatch, actions} = useContext(TaskListContext)

    let navigate = useNavigate()

    const editTask = () => {
        dispatch({type:actions.SELECT, data:props.task})
        navigate("/edit")
    }

    const updateTaskCompleteState = (e) => {
        dispatch({type: actions.UPDATE, data:{...props.task, stage:e.target.value}})
    }

    return (
        <div className="flex border rounded border-black m-2 p-2">
            <select value={props.task.stage} name="stage" id="stage" onChange={(e)=>updateTaskCompleteState(e)}>
                {STAGES.map((stage, index)=>{
                    return (
                        <option key={index} value={stage}>{stage}</option>
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