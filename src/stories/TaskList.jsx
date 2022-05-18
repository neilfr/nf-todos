import React, {useContext} from 'react'
import {TaskListContext} from "../context/TaskListContext";
import {useNavigate} from "react-router-dom";
import {Task} from "./Task";

export const TaskList= () => {
    const {getDefaultTask, state} = useContext(TaskListContext)

    let navigate = useNavigate()

    const editNewTask = (task) => {
        navigate("/edit", {state:{task}})
    }

    return (
        <div>
            <button onClick={ () => editNewTask(getDefaultTask()) }>Add</button>
            {state.length > 0 ? state.map( (task) => {
                return (
                    <Task key={task.id} task={task}/>
                )
            }) : <div>Please add a first task</div>}
        </div>
    )
}
