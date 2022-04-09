import React from 'react'

export const Status = (props) => {
    const changeStatus = () => {
        console.log('change status')
    }
    return(
        <div>
            <input type='checkbox' checked={props.completed} onChange={changeStatus}/>
        </div>
    )
}