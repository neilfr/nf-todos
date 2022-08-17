import React from 'react'

export const Priority = (props) => {

    return (
        <input type="text" aria-label="priority" className="ml-2" value={props.priority} readOnly={true}/>
    )
}