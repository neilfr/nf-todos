import React, {useContext} from 'react'
import {TaskListContext} from "../context/TaskListContext";
import {StageContext} from "../context/StageContext";
import {Task} from "./Task";
import {StageColumn} from "../components/StageColumn";

export const TaskList = (props) => {
    const {tasks, dispatch, actions} = useContext(TaskListContext)
    const {stages} = useContext(StageContext)

    const addNewTask = () => {
        dispatch({type:actions.NEW})
        props.editTask()
    }

    return (
        <div>
            <button onClick={ addNewTask }>Add</button>
            {(tasks.length === 0) && (<p>Please add a first task</p>)}
            <div className={'flex pr-8'}>
                {stages.map( (stage, index) => {
                    return (
                        <StageColumn key={index} title={stage.description}>
                            {tasks.map( (task) => {
                                if (task.stage===stage.description)
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
