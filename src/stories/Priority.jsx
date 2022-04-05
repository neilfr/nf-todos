import React from 'react'

export const Priority = ({
    priority=1
}) => {
    return (
        <input type='number' min='1' value={priority}/>
    )
}