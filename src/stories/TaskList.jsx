import React, {FC} from 'react'
import {Task, TaskProps} from "./Task";

export const TaskList= ({tasks}) => {

    const prioritySort = (a,b) => {
        if(a.priority>b.priority) return 1
        if(a.priority<b.priority) return -1
        return 0
    }

    const sortedTasks = tasks.length>0 ? tasks.sort(prioritySort) : tasks

    return sortedTasks.length>0 ? (
        <div>
            {sortedTasks.map( (task, index) => {
                return (
                    <Task
                        key={index}
                        status={task.status}
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
