import React, {useContext} from 'react'
import {CurrentTaskIdContext} from "../context/CurrentTaskIdContext";
import {Status} from "./Status";
import {TaskListContext} from "../context/TaskListContext";
import {Priority} from "./Priority";

export const TaskForm = () => {
    const {getCurrentTaskId, setCurrentTaskId} = useContext(CurrentTaskIdContext)
    const {getTaskList2} = useContext(TaskListContext)

    console.log('current task id:', getCurrentTaskId)
    console.log('current task list:', getTaskList2)

    return (
        <div>
            <input
                type="text"
                value={getTaskList2[getCurrentTaskId]['description']}
                />
            <input
                type="number"
                value={getTaskList2[getCurrentTaskId]['priority']}
            />
        </div>
    )
}

