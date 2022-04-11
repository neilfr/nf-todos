import React from 'react'

export const Status = (props) => {
    const changeStatus = (e) => {
        console.log('checked',e.target.value)
        props.updateTaskList({
            ...props.task,
            status:e.target.value
        })

    }
    return(
        <div>
            <input type='checkbox' checked={props.task.status} onChange={changeStatus}/>
        </div>
    )
}