import React, {useContext, useEffect, useState} from 'react'
import {useLocation} from "react-router-dom";
import {TaskListContext, defaultTask} from "../context/TaskListContext";
import {useNavigate} from "react-router";

export const TaskForm = () => {

    const {dispatch, actions} = useContext(TaskListContext)
    const location = useLocation()
    const navigate = useNavigate()
    const task = (location && location.state && location.state.task) ? location.state.task : defaultTask
    const [getTask, setTask] = useState(task)
    const [getIsSavable, setIsSavable] = useState(false)

    useEffect(() => {
        (getTask.description.length > 0 && getTask.priority !== '') ? setIsSavable(true) : setIsSavable(false)
    }, [getTask])

    const updateTaskPriority = (e) => {
        setTask({...getTask, priority:e.target.value})
    }

    const updateTaskDescription = (e) => {
        setTask({...getTask, description:e.target.value})
    }

    const updateOrCreateTask = () => {
        const taskToCreateOrUpdate = getTask
        taskToCreateOrUpdate.id === null ?
            dispatch({type: actions.CREATE, data:taskToCreateOrUpdate}) :
            dispatch({type: actions.UPDATE, data:taskToCreateOrUpdate})
        navigate("/")
    }

    const cancel = () => {
        navigate("/")
    }

    const deleteTask = () => {
        dispatch({type: actions.DELETE, data:getTask})
        navigate("/")  // extract to a constant HOMEPAGE or something
    }

    return (
        <div>
            <div>
                <label htmlFor={"priority"}>Priority: </label>
                <input id={"priority"} type={"number"} min={"0"} value={getTask.priority} onChange={(e)=>updateTaskPriority(e)}/>
            </div>
            <div>
                <label htmlFor={"description"}>Description: </label>
                <input id={"description"} type={"text"} value={getTask.description} onChange={(e)=>updateTaskDescription(e)}/>
            </div>
            <button onClick={updateOrCreateTask} disabled={!getIsSavable}>Save</button>
            <button onClick={cancel}>Cancel</button>
            <button onClick={deleteTask}>Delete</button>
        </div>
    )
}