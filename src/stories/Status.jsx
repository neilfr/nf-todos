import React, {useState} from 'react'

export const Status = (props) => {

    const updateChecked = (checked) => {
        setStatus(checked)
        props.updateTaskStatus(checked)
    }

    const [getStatus, setStatus] = useState(props.status)

    return(
        <div>
            <input
                type='checkbox'
                checked={getStatus}
                onChange={(e)=> {updateChecked(e.target.checked)}}
            />
        </div>
    )
}