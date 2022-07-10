import React, {useContext} from 'react'
import {TaskListContext} from "../context/TaskListContext";
import {Task} from "./Task";
import {StatusColumn} from "../components/StatusColumn";
import {STATUSES} from "../Utilities";

export const TaskList = (props) => {
    const {currentTask, tasks, dispatch, actions} = useContext(TaskListContext)

    const updateCurrentTask = () => {
        dispatch({type:actions.SELECT, data: tasks})
    }

    const addNewTask = () => {
        dispatch({type:actions.NEW})
        props.editTask()
    }

    return (
        <div>
            <button onClick={ addNewTask }>Add</button>
            <div className={'flex justify-around'}>
                {STATUSES.map( (status,index) => {
                    return (
                        <StatusColumn key={index}>
                            {tasks.map( (task) => {
                                if (task.status===status)
                                    return (
                                        <Task key={task.id} task={task}/>
                                    )
                            })}
                        </StatusColumn>
                    )
                })}
            </div>
            {(tasks.length === 0) && (<p>Please add a first task</p>)}
        </div>
    )
}
