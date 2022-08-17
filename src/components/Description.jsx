import React from 'react'

export const Description = (props) => {
    return (
            <input type={"text"} aria-label="Description" value={props.description} readOnly={true}/>
    )
}
