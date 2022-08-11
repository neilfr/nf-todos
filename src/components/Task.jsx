import React, {useContext} from 'react'
import {TaskListContext} from "../context/TaskListContext";
import {useNavigate} from "react-router-dom";
import {Priority} from "./Priority";
import {Description} from "./Description";
import {StageContext} from "../context/StageContext";
import {updateTask} from "../service/ApiService";

export const Task = (props) => {
    const {updateTaskCompleteState, dispatch, actions} = useContext(TaskListContext)
    const {stages} = useContext(StageContext)

    let navigate = useNavigate()

    // try moving this to context
    const editTask = () => {
        dispatch({type:actions.SELECT, data:props.task})
        navigate("/edit")
    }

    return (
        <div className="flex border rounded border-black m-2 p-2">
            <select aria-label="stage-select" value={props.task.stage_id} name="stage" id="stage" onChange={(e)=>updateTaskCompleteState(props.task.id,e.target.value)}>
                {stages.map((stage, index)=>{
                    return (
                        <option key={index} value={stage.id}>{stage.description}</option>
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