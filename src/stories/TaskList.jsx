import React, {useContext} from 'react'
import {TaskListContext} from "../context/TaskListContext";
import {useNavigate} from "react-router-dom";
import {Task} from "./Task";

export const TaskList = () => {
    const {tasks} = useContext(TaskListContext)

    let navigate = useNavigate()

    const editNewTask = () => {
        navigate("/edit")
    }

    return (
        <div>
            <button onClick={ () => editNewTask() }>Add</button>
            {tasks.length > 0 ? tasks.map( (task) => {
                return (
                    <Task key={task.id} task={task}/>
                )
            }) : <div>Please add a first task</div>}
        </div>
    )
}
