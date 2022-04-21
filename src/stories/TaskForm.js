import React, {useContext, useState} from 'react'
import {CurrentTaskIdContext} from "../context/CurrentTaskIdContext";
import {TaskListContext} from "../context/TaskListContext";
import {useNavigate} from "react-router-dom";

export const TaskForm = () => {
    const {getCurrentTaskId} = useContext(CurrentTaskIdContext)
    const {getTaskList2, setTaskList2, updateTaskList} = useContext(TaskListContext)

    const [getTaskToUpdate, setTaskToUpdate] = useState(getTaskList2[getCurrentTaskId])

    let navigate = useNavigate()

    const updateTaskToDescription = (e) => {
        setTaskToUpdate({
            ...getTaskToUpdate,
            description: e.target.value
        })
    }

    const updateTaskToPriority = (e) => {
        setTaskToUpdate({
            ...getTaskToUpdate,
            priority: e.target.value
        })
    }

    const updateTask = () => {
        updateTaskList(getTaskToUpdate)
        navigate("/")
    }

    return (
        <div>
            <input
                type="text"
                value={getTaskToUpdate['description']}
                onChange={updateTaskToDescription}
                />
            <input
                type="number"
                value={getTaskToUpdate['priority']}
                onChange={updateTaskToPriority}
            />
            <button onClick={updateTask}>Save</button>
        </div>
    )
}

