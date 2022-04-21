import React, {useContext, useEffect, useState} from 'react'
import {Task} from "./Task";
import {TaskListContext} from "../context/TaskListContext";
import {useNavigate} from "react-router-dom";
import {TaskContext} from "../context/TaskContext";

export const TaskList= () => {
    const {getTaskList2} = useContext(TaskListContext)
    const {setTask} = useContext(TaskContext)

    let navigate = useNavigate()

    const editTask = (task) => {
        setTask(task)
        navigate("/edit",)
    }

    return getTaskList2.length>0 ? (
        <div>
            {getTaskList2.map( (task) => {
                return (
                    <Task
                        key={task.id}
                        onClick={()=>{editTask(task)}}
                    />
                )
            })}
        </div>
    ): (
        <div>Enter a task</div>
    )
}
