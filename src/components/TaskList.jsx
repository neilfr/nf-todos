import React, {useContext} from 'react'
import {TaskListContext} from "../context/TaskListContext";
import {StageContext} from "../context/StageContext";
import {TaskCard} from "./TaskCard";
import {StageColumn} from "./StageColumn";

export const TaskList = (props) => {
    const {addNewTask, tasks} = useContext(TaskListContext)
    const {stages} = useContext(StageContext)

    return (
        <div role={"tasklist"}>
            <button onClick={ addNewTask }>Add</button>
            {(tasks.length === 0) && (<p role={'text'}>Please add a first task</p>)}
            <div className={'flex pr-8'}>
                {stages && stages.map((stage)=>{
                    return (
                        <StageColumn key={stage.id} title={stage.description}>
                            {tasks.map( (task) => {
                                if (task.stage_id === stage.id)
                                    return (
                                        <TaskCard key={task.id} task={task} editTask={props.editTask}/>
                                    )
                            })}
                        </StageColumn>
                    )
                })}
            </div>
        </div>
    )
}
