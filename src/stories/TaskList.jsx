import React, {useContext} from 'react'
import {TaskListContext} from "../context/TaskListContext";
import {Task} from "./Task";
import {StatusColumn} from "../components/StatusColumn";

export const TaskList = (props) => {
    const {currentTask, tasks, dispatch, actions} = useContext(TaskListContext)

    const updateCurrentTask = () => {
        dispatch({type:actions.SELECT, data: tasks})
    }

    const addNewTask = () => {
        dispatch({type:actions.NEW})
        props.editTask()
    }

    const statuses = ["foo", "bar"]

    return (
        <div>
            <div className={'flex justify-around'}>
                {statuses.map( (status) => {
                    return (
                        <StatusColumn>
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
            <button onClick={ addNewTask }>Add</button>
            {tasks.length > 0 ? tasks.map( (task) => {
                return (
                    <Task key={task.id} task={task}/>
                )
            }) : <p>Please add a first task</p>}
        </div>
    )
}
