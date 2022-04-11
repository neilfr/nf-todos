import React from 'react'

export const Priority = (props) => {
    const updatePriority = (e) => {
        props.updateTaskList({
            ...props.task,
            priority:e.target.value
        })
    }
    return (
        <input type='number' min='1' value={props.task.priority} onChange={updatePriority}/>
    )
}