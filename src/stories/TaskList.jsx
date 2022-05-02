import React, {useContext, useEffect, useState} from 'react'
import {Task} from "./Task";
import TaskListProvider, {TaskListContext} from "../context/TaskListContext";
import {AnotherComponent} from "../components/AnotherComponent";

export const TaskList= () => {
    const {getTaskList} = useContext(TaskListContext)
    return (
        <TaskListProvider>
            <AnotherComponent/>
        </TaskListProvider>
    )

    // return getTaskList.length>0 ? (
    //         <div className="pb-2">
    //             {getTaskList.map( (task) => {
    //                 return (
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
}
