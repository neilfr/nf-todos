import React, {useContext} from 'react'
import {Priority} from "./Priority";
import {Status} from "./Status";
import {TaskContext} from "../context/TaskContext";

export const Task = () => {

    const {getTask, setTask} = useContext(TaskContext)
    console.log('did i get here')
    console.log('gettask', getTask)

    const textStyle = {
        height: '1.5rem',
    }

    return (
        <div className="flex border rounded border-black m-2">
            {/*<Status*/}
            {/*    task={getTask}*/}
            {/*/>*/}
            <div>
                <input
                    className="m-2"
                    type='text'
                    style={textStyle}
                    value={getTask ? getTask.description : ''}
                    readOnly
                />
                {/*<Priority*/}
                {/*    className="border border-black m-2"*/}
                {/*    task={getTask}*/}
                {/*/>*/}
            </div>
        </div>
    )
}


