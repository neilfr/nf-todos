import React, {useContext, useState} from 'react'
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

    const updateTaskCompleteState = () => {
        dispatch({type: actions.UPDATE, data:{...props.task, complete:!props.task.complete}})
    }

    return (
        <div className="flex border rounded border-black m-2 p-2">
            <input type={"checkbox"} checked={props.task.complete} onChange={updateTaskCompleteState}/>
            <div className={"w-full"} onClick={editTask}>
                <Priority priority={props.task.priority}/>
                <Description description={props.task.description}/>
            </div>
        </div>
    )
}