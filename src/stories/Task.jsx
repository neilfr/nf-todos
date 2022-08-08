import React, {useContext} from 'react'
import {TaskListContext} from "../context/TaskListContext";
import {useNavigate} from "react-router-dom";
import {Priority} from "./Priority";
import {Description} from "./Description";
import {StageContext} from "../context/StageContext";
import {updateTask} from "../service/ApiService";

export const Task = (props) => {
    const {dispatch, actions} = useContext(TaskListContext)
    const {stages} = useContext(StageContext)

    let navigate = useNavigate()

    const editTask = () => {
        dispatch({type:actions.SELECT, data:props.task})
        navigate("/edit")
    }

    const updateTaskCompleteState = async (e) => {
        const task = await updateTask(props.task.id, {stage_id:e.target.value})
        dispatch({type: actions.UPDATE, data:task})
    }

    return (
        <div className="flex border rounded border-black m-2 p-2">
            <select value={props.task.stage_id} name="stage" id="stage" onChange={(e)=>updateTaskCompleteState(e)}>
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