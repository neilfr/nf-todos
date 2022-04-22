import React, {useState, useEffect, useContext} from "react";
import {TaskList} from "../stories/TaskList";
import {TaskListContext} from "../context/TaskListContext";

const MainPage = () => {

    const {getTaskList, setTaskList} = useContext(TaskListContext)
    const [getNewTaskId, setNewTaskId] = useState(0)

    const [getNewTask,setNewTask] = useState({
        status: false,
        description: '',
        priority:1,
        id:0,
    })

    const [getIsSavable, setIsSavable] = useState(false)

    useEffect(()=>{
        (Object.keys(getNewTask).length>0 && getNewTask.description.length>0) ? setIsSavable(true) : setIsSavable(false)
    }, [getNewTask])

    const addTask = () => {
        setTaskList([
            ...getTaskList, {
                id:getNewTask.id,
                status:getNewTask.status,
                description:getNewTask.description,
                priority:getNewTask.priority
            }
        ])
        setNewTask({
            status:false,
            description:'',
            priority:1,
            id:getNewTaskId+1,
        })
        setNewTaskId(getNewTaskId+1)
    }


    const updateTaskFormDescription = (e) => {
        setNewTask({...getNewTask, description:e.target.value})
    }

    const updateTaskFormPriority = (e) => {
        setNewTask({...getNewTask, priority: e.target.value})
    }

    return (
        <>
            <h1>page one header</h1>
            <div>
                <label htmlFor="bar">Description</label>
                <input
                    type='text'
                    name='foo'
                    id='bar'
                    value={getNewTask.description}
                    onChange={updateTaskFormDescription}
                    placeholder='Task Description'
                />
                <label htmlFor="priority">Priority:</label>
                <input
                    type="number"
                    name="priority"
                    id="priority"
                    value={getNewTask.priority}
                    onChange={updateTaskFormPriority}
                    min="1"
                    />
                <button onClick={addTask} disabled={!getIsSavable}>Add Task</button>
                <TaskList/>
            </div>
        </>
    )
}

export default MainPage