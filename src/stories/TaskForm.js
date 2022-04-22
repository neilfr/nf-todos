import React, {useContext} from 'react'
import {useNavigate} from "react-router-dom";
import {TaskListContext} from "../context/TaskListContext";
import {TaskContext} from "../context/TaskContext";

export const TaskForm = () => {
    const {getTask, setTask} = useContext(TaskContext)
    const {updateTaskList} = useContext(TaskListContext)

    let navigate = useNavigate()

    const updateTaskDescription = (e) => {
        setTask({
            ...getTask,
            description: e.target.value
        })
    }

    const updateTaskPriority = (e) => {
        setTask({
            ...getTask,
            priority: e.target.value
        })
    }

    const updateTask = () => {
        updateTaskList(getTask)
        navigate("/")
    }

    return (
        <div>
            <input
                type="text"
                value={getTask['description']}
                onChange={updateTaskDescription}
                />
            <input
                type="number"
                value={getTask['priority']}
                onChange={updateTaskPriority}
            />
            <button onClick={updateTask}>Save</button>
        </div>
    )
}

