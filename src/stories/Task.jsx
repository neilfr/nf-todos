import React, {useContext} from 'react'
import {Priority} from "./Priority";
import {Status} from "./Status";
import {useNavigate} from "react-router-dom";
import {TaskContext} from "../context/TaskContext";
import {TaskListContext} from "../context/TaskListContext";

export const Task = (props) => {
    const {setTask: setTaskToEdit} = useContext(TaskContext)

    const {updateTaskList} = useContext(TaskListContext)

    const textStyle = {
        height: '1.5rem',
    }

    let navigate = useNavigate()

    // const currentTask = props.task
    const editTask = () => {
        setTaskToEdit(props.task)
        navigate("/edit",)
    }

    const updateTaskStatus = (status) => {
        console.log('on task:',props.task)
        console.log('update status to:',status)
        const foo = {...props.task,status}
        console.log('foo',foo)
        updateTaskList(foo)
    }

    return (
        <div className="flex border rounded border-black m-2">
            <Status
                status={props.task.status}
                updateTaskStatus={updateTaskStatus}
            />
            <div onClick={editTask}>
                <input
                    className="m-2"
                    type='text'
                    style={textStyle}
                    value={props.task.description}
                    readOnly
                />
                <Priority
                    className="border border-black m-2"
                    priority={props.task.priority}
                />
            </div>
        </div>
    )
}


