import React, {useContext} from 'react'
import {TaskListContext} from "../context/TaskListContext";
import {Priority} from "./Priority";
import {Description} from "./Description";
import {StageContext} from "../context/StageContext";

export const TaskCard = (props) => {
    const {updateTaskStage, editTask} = useContext(TaskListContext)
    const {stages} = useContext(StageContext)

    return (
        <div className="flex border rounded border-black m-2 p-2">
            <select aria-label={`stage-select-for-${props.task.description}`} value={props.task.stage_id} onChange={(e)=>updateTaskStage(props.task.id,e.target.value)}>
                {stages.map((stage, index)=>{
                    return (
                        <option aria-label={`stage-select-option-${stage.description}`} key={index} value={stage.id}>{stage.description}</option>
                    )
                })}
            </select>
            <div aria-label={`task-select-for-${props.task.description}`} className={"w-full"} onClick={() => {editTask(props.task)}}>
                <Priority priority={props.task.priority}/>
                <Description description={props.task.description}/>
            </div>
        </div>
    )
}