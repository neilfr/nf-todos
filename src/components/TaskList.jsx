import React, {useContext} from 'react'
import {TaskListContext} from "../context/TaskListContext";
import {StageContext} from "../context/StageContext";
import {Task} from "./Task";
import {StageColumn} from "./StageColumn";

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
                {stages && stages.map((stage)=>{
                    return (
                        <StageColumn key={stage.id} title={stage.description}>
                            {tasks.map( (task) => {
                                if (task.stage_id === stage.id)
                                    return (
                                        <Task key={task.id} task={task} editTask={props.editTask}/>
                                    )
                            })}
                        </StageColumn>
                    )
                })}
            </div>
        </div>
    )
}
