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
            <select aria-label={'Task stage'} value={props.task.stage_id} onChange={(e)=>updateTaskStage(props.task.id,e.target.value)}>
                {stages.map((stage, index)=>{
                    const isSelected = stage.id === props.task.stage_id
                    return (
                        <option aria-label={stage.description} aria-selected={isSelected} key={index} value={stage.id}>{stage.description}</option>
                    )
                })}
            </select>
            <div role="button" aria-label={props.task.description} className={"w-full"} onClick={() => {editTask(props.task)}}>
                <Priority priority={props.task.priority}/>
                <Description description={props.task.description}/>
            </div>
        </div>
    )
}