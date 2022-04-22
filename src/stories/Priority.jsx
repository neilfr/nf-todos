import React from 'react'

export const Priority = (props) => {

    return (
        <input type='number' min='1' value={props.priority} readOnly/>
    )
}