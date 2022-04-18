import React from 'react'

export const Status = (props) => {
    const changeStatus = (e) => {
        props.updateTaskList({
            ...props.task,
            status:!props.task.status
        })
    }

    return(
        <div>
            <input type='checkbox' checked={props.task.status} onChange={changeStatus}/>
        </div>
    )
}