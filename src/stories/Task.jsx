import React, {FC} from 'react'
import {Priority} from "./Priority";
import {Status} from "./Status";

export const Task = ({
    status= false,
    placeholder='enter a task',
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
                placeholder={placeholder}
                style={textStyle}
                value={description}
            />
            <Priority priority={priority}/>
        </div>
    )
}


