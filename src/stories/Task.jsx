import React, {FC, useEffect} from 'react'
import {Priority} from "./Priority";
import {Status} from "./Status";

export const Task = (props) => {

    const textStyle = {
        height: '1.5rem',
    }

    return (
        <div>
            <Status completed={props.status}/>
            <input
                type='text'
                placeholder='Enter a task'
                style={textStyle}
                value={props.description}
                onChange={(e)=>props.updateTaskList(e,props.id)}
            />
            <Priority priority={props.priority}/>
        </div>
    )
}


