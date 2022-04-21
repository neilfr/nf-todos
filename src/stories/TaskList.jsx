import React, {useContext, useEffect, useState} from 'react'
import {Task} from "./Task";
import {TaskListContext} from "../context/TaskListContext";
import {CurrentTaskIdContext} from "../context/CurrentTaskIdContext";

export const SORT_OPTIONS = {
    SORT_BY_DESCRIPTION: 'description',
    SORT_BY_PRIORITY: 'priority'
}

export const TaskList= (props) => {
    const {getTaskList2,setTaskList2} = useContext(TaskListContext)
    const {getCurrentTaskId} = useContext(CurrentTaskIdContext)

    return getTaskList2.length>0 ? (
        <div>
            {getTaskList2.map( (task) => {
                return (
                    <Task
                        key={task.id}
                        task={task}
                        status={task.status}
                    />
                )
            })}
        </div>
    ): (
        <div>Enter a task</div>
    )
}
