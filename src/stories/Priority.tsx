import React, {FC} from 'react'

export type PriorityProps = {
    priority?:number,
}

export const Priority:FC<PriorityProps> = ({
    priority=1
}) => {
    return (
        <input type='number' min='1' value={priority}/>
    )
}