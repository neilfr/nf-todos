import React from 'react'

export const Priority = (props) => {
    const changePriority = () => {
        console.log('change priority')
    }
    return (
        <input type='number' min='1' value={props.priority} onChange={changePriority}/>
    )
}