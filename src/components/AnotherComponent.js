import React from 'react'
import {useTaskList} from "../context/TaskListContext";
import {Task} from "../stories/Task";

export const AnotherComponent = () => {

    // const taskListContext = useTaskList()
    //
    // return taskListContext.getTaskList2.length>0 ? (
    //         <div className="pb-2">
    //             {taskListContext.getTaskList2.map( (task) => {
    //                 return (
    //                     // <p>{task}</p>
    //                     <Task
    //                         key={task.id}
    //                         task={task}
    //                     />
    //                 )
    //             })}
    //         </div>
    //     ): (
    //         <div>Enter a task</div>
    // )
    return (
        <div>
            foo
        </div>
    )

}