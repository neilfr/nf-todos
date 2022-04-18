import React, {useState, useEffect, useContext} from "react";
import {TaskList} from "../stories/TaskList";
import {TestContext} from "../context/TestContext";
import {TaskListContext} from "../context/TaskListContext";

const MainPage = () => {

    const {getTest, setTest} =useContext(TestContext)
    const {getTaskList2, setTaskList2} = useContext(TaskListContext)
    const [getNewTaskId, setNewTaskId] = useState(0)

    const [getTask,setTask] = useState({
        status: false,
        description: '',
        priority:1,
        id:0,
    })

    const [getTaskList,setTaskList] = useState([])

    const [getIsSavable, setIsSavable] = useState(false)

    useEffect(()=>{
        (Object.keys(getTask).length>0 && getTask.description.length>0) ? setIsSavable(true) : setIsSavable(false)
    }, [getTask])

    const addTask = () => {
        setTaskList2([
            ...getTaskList2, {
                id:getTask.id,
                status:getTask.status,
                description:getTask.description,
                priority:getTask.priority
            }
        ])
        setTaskList([
            ...getTaskList, {
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

    const updateTaskList = (updatedTask) => {
        console.log('updated task is:', updatedTask)
        const updatedTaskList = getTaskList.map((task)=>{
            if(task.id===updatedTask.id){
                task.description=updatedTask.description
                task.status=updatedTask.status
                task.priority=updatedTask.priority
            }
            return task
        })
        setTaskList(updatedTaskList)
    }

    const updateTaskFormDescription = (e) => {
        setTask({...getTask, description:e.target.value})
    }

    const updateTaskFormPriority = (e) => {
        setTask({...getTask, priority: e.target.value})
    }

    return (
        <>
            <p>{getTest}</p>
            <button onClick={()=>setTest('BAR')}>set to bar</button>
            <h1>page one header</h1>
            <p>this is my page one text</p>
            <div>
                <label htmlFor="bar">Description</label>
                <input
                    type='text'
                    name='foo'
                    id='bar'
                    value={getTask.description}
                    onChange={updateTaskFormDescription}
                    placeholder='Task Description'
                />
                <label htmlFor="priority">Priority:</label>
                <input
                    type="number"
                    name="priority"
                    id="priority"
                    value={getTask.priority}
                    onChange={updateTaskFormPriority}
                    min="1"
                    />
                <button onClick={addTask} disabled={!getIsSavable}>Add Task</button>
                <TaskList tasks={getTaskList} updateTaskList={updateTaskList}/>
            </div>
        </>
    )
}

export default MainPage