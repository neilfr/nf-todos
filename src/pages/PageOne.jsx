import React, {useState,useEffect} from "react";
import {TaskList} from "../stories/TaskList";

const PageOne = () => {

    const [getTask,setTask] = useState({})

    const [getTasks,setTaskList] = useState([])

    const [getIsSavable, setIsSavable] = useState(false)

    useEffect(()=>{
        (Object.keys(getTask).length>0 && getTask.description.length>0) ? setIsSavable(true) : setIsSavable(false)
    }, [getTask])

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
                <button onClick={addTask} disabled={!getIsSavable}>Add Task</button>
                <TaskList tasks={getTasks}/>
            </div>
        </>
    )
}

export default PageOne