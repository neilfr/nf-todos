import React, {useContext, useEffect, useState} from 'react'
import {Task} from "./Task";
import {TaskListContext} from "../context/TaskListContext";

export const TaskList= () => {
    const {getTaskList} = useContext(TaskListContext)

    return getTaskList.length>0 ? (
        <div className="pb-2">
            {getTaskList.map( (task) => {
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
