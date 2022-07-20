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

    return (
        <div>
            <button onClick={ addNewTask }>Add</button>
            <div className={'flex justify-around'}>
                {STAGES.map( (stage, index) => {
                    return (
                        <StageColumn key={index}>
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
            {(tasks.length === 0) && (<p>Please add a first task</p>)}
        </div>
    )
}
