import React, {useContext} from 'react'
import {TaskListContext} from "../context/TaskListContext";
import {useNavigate} from "react-router-dom";

export const TaskList= () => {
    const {tasks, updateTaskCompleteStatus, getDefaultTask} = useContext(TaskListContext)

    let navigate = useNavigate()

    const editTask = (task) => {
        navigate("/edit", {state:{task}})
    }

    return (
        <div>
            <button onClick={ () => editTask(getDefaultTask()) }>Add</button>
            {tasks.length > 0 ? tasks.map( (task) => {
                return (
                    <div key={task.id} className={"flex"}>
                        <input type={"checkbox"} checked={task.complete} onChange={()=>updateTaskCompleteStatus(task.id)}/>
                        <div onClick={()=>{editTask(task)}}>
                            <span>{task.priority}</span>
                            <span>{task.description}</span>
                        </div>
                    </div>
                )
            }) : <div>Please add a first task</div>}
        </div>
    )
}
