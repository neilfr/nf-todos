import React from 'react'

export const Status = ({
    completed
                                    }) => {
    const changeStatus = () => {
        console.log('change status')
    }
    return(
        <div>
            <input type='checkbox' checked={completed} onChange={changeStatus}/>
        </div>
    )
}