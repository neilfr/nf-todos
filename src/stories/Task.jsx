import React, {FC, useEffect, useState} from 'react'
import {Priority} from "./Priority";
import {Status} from "./Status";

export const Task = (props) => {

    const textStyle = {
        height: '1.5rem',
    }

    const task = {
        id:props.id,
        description:props.description,
        status: props.status,
        priority: props.priority
    }

    const updateDescription = (e) => {
        props.updateTaskList({
            id:props.id,
            description:e.target.value,
            status: props.status,
            priority: props.priority
        })
    }

    return (
        <div>
            <Status completed={props.status}/>
            <input
                type='text'
                style={textStyle}
                value={props.description}
                onChange={updateDescription}
            />
            <Priority priority={props.priority} updateTaskList={props.updateTaskList} task={task}/>
        </div>
    )
}


