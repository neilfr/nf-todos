import React, {FC} from 'react'
import {Task, TaskProps} from "./Task";

export const TaskList= ({tasks}) => {
    console.log('hello',tasks)

    return tasks.length>0 ? (
        <div>
            {tasks.map( (task) => {
                return (
                    <Task
                        status={task.status}
                        placeholder={task.placeholder}
                        description={task.description}
                        priority={task.priority}
                    />
                )
            })}
        </div>
    ): (
        <div>Enter a task</div>
    )
}
