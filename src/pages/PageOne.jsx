import React, {useState} from "react";
import {TaskList} from "../stories/TaskList";

const PageOne = () => {

    const [getTask,setTask] = useState({
        status:false,
        description:'',
        priority:1
    })

    const [getTasks,setTaskList] = useState([])

    const addTask = () => {
        setTaskList([
            ...getTasks, {
                status:getTask.status,
                description:getTask.description,
                priority:getTask.priority
            }
        ])
        setTask({
            status:false,
            description:'',
            priority:1
        })
    }

    const updateTaskDescription = (e) => {
        console.log(e.target.value.charCodeAt(e.target.value.length))
        // if(e.target.value.slice.charCodeAt(e.target.value.length))
        setTask({
            status:true,
            description:e.target.value,
            priority:1
        })
    }

    return (
        <>
            <h1>page one header</h1>
            <p>this is my page one text</p>
            <div>
                <label htmlFor="bar">Description</label>
                <input
                    type='text'
                    name='foo'
                    id='bar'
                    value={getTask.description}
                    onChange={updateTaskDescription}
                    placeholder='Task Description'
                />
                <button disabled={getTask.description.length<1} onClick={addTask}>Add Task</button>
                <TaskList tasks={getTasks}/>
            </div>
        </>
    )
}

export default PageOne