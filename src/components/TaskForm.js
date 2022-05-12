import React, {useContext, useEffect, useState} from 'react'
import {useLocation} from "react-router-dom";
import {TaskListContext} from "../context/TaskListContext";
import {useNavigate} from "react-router";

export const TaskForm = () => {

    const {updateOrCreateTask, removeTask} = useContext(TaskListContext)
    const location = useLocation()
    const navigate = useNavigate()
    const task = location.state.task
    const [getTask, setTask] = useState(task)
    const [getIsSavable, setIsSavable] = useState(false)

    useEffect(() => {
        (getTask.description.length > 0 && getTask.priority.length > 0) ? setIsSavable(true) : setIsSavable(false)
    }, [getTask])

    const updateTaskPriority = (e) => {
        setTask({...getTask, priority:e.target.value})
    }

    const updateTaskDescription = (e) => {
        setTask({...getTask, description:e.target.value})
    }

    const saveTask = () => {
        updateOrCreateTask(getTask)
        navigate("/")
    }

    const cancel = () => {
        navigate("/")
    }

    const deleteTask = () => {
        removeTask(getTask)
        navigate("/")
    }

    return (
        <div>
            <div>
                <label htmlFor={"priority"}>Priority: </label>
                <input id="priority" type={"number"} min={"0"} value={getTask.priority} onChange={(e)=>updateTaskPriority(e)}/>
            </div>
            <div>
                <label htmlFor={"description"}>Description: </label>
                <input id="description" type={"text"} value={getTask.description} onChange={(e)=>updateTaskDescription(e)}/>
            </div>
            <button onClick={saveTask} disabled={!getIsSavable}>Save</button>
            <button onClick={cancel}>Cancel</button>
            <button onClick={deleteTask}>Delete</button>
        </div>
    )
}