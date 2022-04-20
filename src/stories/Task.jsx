import React, {FC, useContext, useEffect, useState} from 'react'
import {Priority} from "./Priority";
import {Status} from "./Status";
import {useNavigate} from "react-router-dom";
import {CurrentTaskIdContext} from "../context/CurrentTaskIdContext";
import {TaskListContext} from "../context/TaskListContext";

export const Task = (props) => {

    let navigate = useNavigate()
    const {setCurrentTaskId} = useContext(CurrentTaskIdContext)

    const textStyle = {
        height: '1.5rem',
    }

    // const updateDescription = (e) => {
    //     props.updateTaskList({
    //         ...props.task,
    //         description:e.target.value
    //     })
    // }

    const editTask = () => {
        setCurrentTaskId(props.task.id)
        navigate("/edit",)
    }

    return (
        <div className="flex border rounded border-black m-2" onClick={editTask}>
            <Status
                task={props.task}
            />
            <div>
                <input
                    className="m-2"
                    type='text'
                    style={textStyle}
                    value={props.task.description}
                    readOnly
                />
                <Priority
                    className="border border-black m-2"
                    task={props.task}
                />
            </div>
        </div>
    )
}


