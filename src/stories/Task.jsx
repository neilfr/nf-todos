import React, {FC} from 'react'
import {Priority} from "./Priority";
import {Status} from "./Status";

export const Task = ({
    status= false,
    description,
    priority
                                         }) => {
    const textStyle = {
        height: '1.5rem',
    }

    const updateTask = () => {
        console.log('update task')
    }

    return (
        <div>
            <Status completed={status}/>
            <input
                type='text'
                placeholder='Enter a task'
                style={textStyle}
                value={description}
                onChange={updateTask}
            />
            <Priority priority={priority}/>
        </div>
    )
}


