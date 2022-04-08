import React from 'react'

export const Priority = ({
    priority=1
}) => {
    const changePriority = () => {
        console.log('change priority')
    }
    return (
        <input type='number' min='1' value={priority} onChange={changePriority}/>
    )
}