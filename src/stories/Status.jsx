import React from 'react'

export const Status = ({
    completed
                                    }) => {
    return(
        <div>
            <input type='checkbox' checked={completed}/>
        </div>
    )
}