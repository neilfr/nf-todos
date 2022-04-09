import React, {FC} from 'react'
import {Task, TaskProps} from "./Task";

export const SORT_OPTIONS = {
    SORT_BY_DESCRIPTION: 'description',
    SORT_BY_PRIORITY: 'priority'
}

export const TaskList= ({tasks, updateTaskList, sortByProperty}) => {

    const prioritySort = (a,b) => {
        if(a.priority>b.priority) return 1
        if(a.priority<b.priority) return -1
        return 0
    }

    const descriptionSort = (a,b) => {
        if(a.description>b.description) return 1
        if(a.description<b.description) return -1
        return 0
    }



    const sortBy = (property) => {
        switch (property){
            case 'priority':
                return tasks.sort(prioritySort)
                break
            case 'description':
                return tasks.sort(descriptionSort)
                break
            default:
                return tasks.sort(prioritySort)
        }
    }

    const sortedTasks = tasks.length>0 ? sortBy(sortByProperty) : tasks



    return sortedTasks.length>0 ? (
        <div>
            {sortedTasks.map( (task, index) => {
                return (
                    <Task
                        key={index}
                        id={task.id}
                        status={task.status}
                        description={task.description}
                        priority={task.priority}
                        updateTaskList={updateTaskList}
                    />
                )
            })}
        </div>
    ): (
        <div>Enter a task</div>
    )
}
