import React, {useContext, useEffect, useState} from 'react'
import {Task} from "./Task";
import {TaskListContext} from "../context/TaskListContext";

export const TaskList= () => {
    const {getTaskList2} = useContext(TaskListContext)

    return getTaskList2.length>0 ? (
        <div>
            {getTaskList2.map( (task) => {
                return (
                    <Task
                        key={task.id}
                        task={task}
                    />
                )
            })}
        </div>
    ): (
        <div>Enter a task</div>
    )
}
