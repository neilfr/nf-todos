import React from 'react'

export const Priority = (props) => {
    console.log('task',props.task)
    const changePriority = (e) => {
        props.updateTaskList({
            id:props.task.id,
            description:props.task.description,
            status: props.task.status,
            priority: e.target.value
        })
    }
    return (
        <input type='number' min='1' value={props.priority} onChange={changePriority}/>
    )
}