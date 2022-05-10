import React, {useContext} from 'react'
import {TaskListContext} from "../context/TaskListContext";
import {useNavigate} from "react-router-dom";
import {Task} from "../components/Task";

export const TaskList= () => {
    const {getTaskList, getDefaultTask, getSortedTaskList} = useContext(TaskListContext)

    let navigate = useNavigate()

    const editNewTask = (task) => {
        navigate("/edit", {state:{task}})
    }

    return (
        <div>
            <button onClick={ () => editNewTask(getDefaultTask()) }>Add</button>
            {getTaskList.length > 0 ? getSortedTaskList.map( (task) => {
                return (
                    <Task key={task.id} task={task}/>
                )
            }) : <div>Please add a first task</div>}
        </div>
    )
}
