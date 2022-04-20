import React, {useContext, useEffect, useState} from 'react'
import {Task} from "./Task";
import {TaskListContext} from "../context/TaskListContext";

export const SORT_OPTIONS = {
    SORT_BY_DESCRIPTION: 'description',
    SORT_BY_PRIORITY: 'priority'
}

export const TaskList= (props) => {
    const {getTaskList2,setTaskList2} = useContext(TaskListContext)

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
                return getTaskList2.sort(prioritySort)
                break
            case 'description':
                return getTaskList2.sort(descriptionSort)
                break
            default:
                return getTaskList2.sort(prioritySort)
        }
    }

    useEffect(() => {
        setTaskList2(getTaskList2.length>0 ? sortBy(props.sortByProperty) : getTaskList2)
    },[])

    return getTaskList2.length>0 ? (
        <div>
            {getTaskList2.map( (task, index) => {
                return (
                    <Task
                        key={index}
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
