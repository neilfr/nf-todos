import React, {FC, useEffect} from 'react'
import {Priority} from "./Priority";
import {Status} from "./Status";

export const Task = ({
    status= false,
    description,
    priority,
    id,
    updateTaskList
                                         }) => {

    const textStyle = {
        height: '1.5rem',
    }

    const updateTask = (e) => {
        console.log('update task with id:', id)
    }

    return (
        <div>
            <Status completed={status}/>
            <input
                type='text'
                placeholder='Enter a task'
                style={textStyle}
                value={description}
                onChange={(e)=>updateTaskList(e,id)}
            />
            <Priority priority={priority}/>
        </div>
    )
}


