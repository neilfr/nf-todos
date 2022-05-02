import React, {useContext} from 'react'
import TaskListProvider, {TaskListContext, useTaskList} from "../context/TaskListContext";

export const AnotherComponent = () => {

    const foo = useTaskList()

    return (
        <div>
            <p>sending something:{foo.x}</p>
        </div>
    )

}