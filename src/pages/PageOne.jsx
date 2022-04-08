import React, {useState,useEffect} from "react";
import {TaskList} from "../stories/TaskList";

const PageOne = () => {
    const [getNewTaskId, setNewTaskId] = useState(0)

    const [getTask,setTask] = useState({
        status: false,
        description: '',
        priority:1,
        id:0,
    })

    const [getTasks,setTaskList] = useState([])

    const [getIsSavable, setIsSavable] = useState(false)

    useEffect(()=>{
        (Object.keys(getTask).length>0 && getTask.description.length>0) ? setIsSavable(true) : setIsSavable(false)
    }, [getTask])

    const addTask = () => {
        console.log('id', getTask.id, 'getnewtaskid', getNewTaskId)
        setTaskList([
            ...getTasks, {
                id:getTask.id,
                status:getTask.status,
                description:getTask.description,
                priority:getTask.priority
            }
        ])
        setTask({
            status:false,
            description:'',
            priority:1,
            id:getNewTaskId+1,
        })
        setNewTaskId(getNewTaskId+1)
    }

    const updateTaskDescription = (e) => {
        setTask({...getTask, description:e.target.value})
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