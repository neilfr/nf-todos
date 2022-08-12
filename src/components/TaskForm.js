import React, {useContext, useEffect, useState} from 'react'
import {TaskListContext} from "../context/TaskListContext";
import {useNavigate} from "react-router";

export const TaskForm = () => {

    const {cancel, updateOrCreateTask, deleteTask, currentTask} = useContext(TaskListContext)
    const [getTask, setTask] = useState(currentTask)
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
            <button onClick={() => updateOrCreateTask(getTask)} disabled={!getIsSavable}>Save</button>
            <button onClick={cancel}>Cancel</button>
            <button onClick={()=>deleteTask(getTask)}>Delete</button>
        </div>
    )
}