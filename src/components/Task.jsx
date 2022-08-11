import React, {useContext} from 'react'
import {TaskListContext} from "../context/TaskListContext";
import {useNavigate} from "react-router-dom";
import {Priority} from "./Priority";
import {Description} from "./Description";
import {StageContext} from "../context/StageContext";
import {updateTask} from "../service/ApiService";

export const Task = (props) => {
    const {updateTaskStage, editTask, dispatch, actions} = useContext(TaskListContext)
    const {stages} = useContext(StageContext)

    return (
        <div className="flex border rounded border-black m-2 p-2">
            <select aria-label="stage-select" value={props.task.stage_id} name="stage" id="stage" onChange={(e)=>updateTaskStage(props.task.id,e.target.value)}>
                {stages.map((stage, index)=>{
                    return (
                        <option key={index} value={stage.id}>{stage.description}</option>
                    )
                })}
            </select>
            <div className={"w-full"} onClick={() => {editTask(props.task)}}>
                <Priority priority={props.task.priority}/>
                <Description description={props.task.description}/>
            </div>
        </div>
    )
}