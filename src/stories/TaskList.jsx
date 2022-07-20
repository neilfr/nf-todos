import React, {useContext} from 'react'
import {TaskListContext} from "../context/TaskListContext";
import {Task} from "./Task";
import {StageColumn} from "../components/StageColumn";
import {STAGES} from "../Utilities";

export const TaskList = (props) => {
    const {tasks, dispatch, actions} = useContext(TaskListContext)

    const addNewTask = () => {
        dispatch({type:actions.NEW})
        props.editTask()
    }

    console.log('length', tasks.length)
    console.log('tasks', tasks)

    return (
        <div>
            <button onClick={ addNewTask }>Add</button>
            {(tasks.length === 0) && (<p>Please add a first task</p>)}
            <div className={'flex justify-around'}>
                {STAGES.map( (stage, index) => {
                    return (
                        <StageColumn key={index} title={stage}>
                            {tasks.map( (task) => {
                                if (task.stage===stage)
                                    return (
                                        <Task key={task.id} task={task}/>
                                    )
                            })}
                        </StageColumn>
                    )
                })}
            </div>
        </div>
    )
}
