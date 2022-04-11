import React, {FC, useEffect, useState} from 'react'
import {Priority} from "./Priority";
import {Status} from "./Status";

export const Task = (props) => {

    const textStyle = {
        height: '1.5rem',
    }

    const updateDescription = (e) => {
        props.updateTaskList({
            ...props.task,
            description:e.target.value
        })
    }

    return (
        <div>
            <Status task={props.task} updateTaskList={props.updateTaskList}/>
            <input
                type='text'
                style={textStyle}
                value={props.task.description}
                onChange={updateDescription}
            />
            <Priority updateTaskList={props.updateTaskList} task={props.task}/>
        </div>
    )
}


