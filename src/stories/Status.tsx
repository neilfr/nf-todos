import React, {FC} from 'react'

export type StatusProps = {
    completed:boolean
}

export const Status:FC<StatusProps> = ({
    completed
                                    }) => {
    return(
        <div>
            <input type='checkbox' checked={completed}/>
        </div>
    )
}