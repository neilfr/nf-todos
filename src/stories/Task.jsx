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

    return (
        <div>
            <Status completed={status}/>
            <input
                type='text'
                placeholder='Enter a task'
                style={textStyle}
                value={description}
            />
            <Priority priority={priority}/>
        </div>
    )
}


