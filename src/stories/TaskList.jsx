import React, {FC} from 'react'
import {Task, TaskProps} from "./Task";

export const SORT_OPTIONS = {
    SORT_BY_DESCRIPTION: 'description',
    SORT_BY_PRIORITY: 'priority'
}

export const TaskList= (props) => {

    //todo: sorting like strings instead of integers
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
                return props.tasks.sort(prioritySort)
                break
            case 'description':
                return props.tasks.sort(descriptionSort)
                break
            default:
                return props.tasks.sort(prioritySort)
        }
    }

    const sortedTasks = props.tasks.length>0 ? sortBy(props.sortByProperty) : props.tasks

    return sortedTasks.length>0 ? (
        <div>
            {sortedTasks.map( (task, index) => {
                return (
                    <Task
                        key={index}
                        task={task}
                        status={task.status}
                        updateTaskList={props.updateTaskList}
                    />
                )
            })}
        </div>
    ): (
        <div>Enter a task</div>
    )
}
