import React, {useContext} from 'react'
import {CurrentTaskIdContext} from "../context/CurrentTaskIdContext";
import {TaskListContext} from "../context/TaskListContext";

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
                readOnly
                />
            <input
                type="number"
                value={getTaskList2[getCurrentTaskId]['priority']}
                readOnly
            />
        </div>
    )
}

