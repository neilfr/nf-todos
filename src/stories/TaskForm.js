import React, {useContext, useEffect, useState} from 'react'
import {TaskListContext} from "../context/TaskListContext";
import {useNavigate} from "react-router";
import {createTask} from "../service/ApiService";

export const TaskForm = () => {

    const {currentTask, dispatch, actions} = useContext(TaskListContext)
    const navigate = useNavigate()
    const task = currentTask
    const [getTask, setTask] = useState(task)
    const [getIsSavable, setIsSavable] = useState(false)

    useEffect(()=>{
        setTask(currentTask)
    },[])

    useEffect(() => {
        (getTask.description.length > 0 && getTask.priority !== '') ? setIsSavable(true) : setIsSavable(false)
    }, [getTask])

    const updateTaskPriority = (e) => {
        setTask({...getTask, priority:e.target.value})
    }

    const updateTaskDescription = (e) => {
        setTask({...getTask, description:e.target.value})
    }

    const updateOrCreateTask = async () => {
        const taskToCreateOrUpdate = getTask
        if (taskToCreateOrUpdate.id === null) {
            console.log('taskToCreateOrUpdate: ', taskToCreateOrUpdate)
            const task = await createTask(taskToCreateOrUpdate)
            dispatch({type: actions.CREATE, data:task})
        } else {
            dispatch({type: actions.UPDATE, data:taskToCreateOrUpdate})
        }
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