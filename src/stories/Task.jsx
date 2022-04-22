import React, {useContext} from 'react'
import {Priority} from "./Priority";
import {Status} from "./Status";
import {useNavigate} from "react-router-dom";
import {TaskContext} from "../context/TaskContext";
import {TaskListContext} from "../context/TaskListContext";

export const Task = (props) => {
    const {setTask: setTaskToEdit} = useContext(TaskContext)

    const {updateTaskList} = useContext(TaskListContext)

    let navigate = useNavigate()

    const editTask = () => {
        setTaskToEdit(props.task)
        navigate("/edit",)
    }

    const updateTaskStatus = (status) => {
        updateTaskList({...props.task,status})
    }

    return (
        <div className="flex border rounded border-black m-2 p-2">
            <Status
                status={props.task.status}
                updateTaskStatus={updateTaskStatus}
            />
            <div className="flex ml-2" onClick={editTask}>
                <input
                    className="rounded"
                    type='text'
                    value={props.task.description}
                    readOnly
                />
                <Priority
                    priority={props.task.priority}
                />
            </div>
        </div>
    )
}


