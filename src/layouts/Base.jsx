import React, {useState} from "react";
import {TaskListProvider} from "../context/TaskListContext";
import {TaskList} from "../stories/TaskList";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import {Foo} from "../components/Foo";


const Base = () => {
    const [getTask, setTask] = useState(null)
    const [getTaskList, setTaskList] = useState([])

    const sortTaskList = (tl) => {
        const descriptionSortedUpdatedTaskList = tl.length>0 ? tl.sort(descriptionSort) : tl
        const prioritySortedUpdatedTaskList = descriptionSortedUpdatedTaskList.length>0 ? descriptionSortedUpdatedTaskList.sort(prioritySort) : descriptionSortedUpdatedTaskList
        return prioritySortedUpdatedTaskList.length>0 ? prioritySortedUpdatedTaskList.sort(statusSort) : prioritySortedUpdatedTaskList
    }

    const updateTaskList = (updatedTask) => {
        const updatedTaskList = getTaskList.map((task)=>{
            return task.id === updatedTask.id ? updatedTask : task
        })

        setTaskList(sortTaskList(updatedTaskList))
    }

    const statusSort = (a,b) => {
        if(a.status>b.status) return 1
        if(a.status<b.status) return -1
        return 0
    }

    const prioritySort = (a, b) => {
        if(parseInt(a.priority)>parseInt(b.priority)) return 1
        if(parseInt(a.priority)<parseInt(b.priority)) return -1
        return 0
    }

    const descriptionSort = (a,b) => {
        if(a.description>b.description) return 1
        if(a.description<b.description) return -1
        return 0
    }

    return (
        <TaskListProvider>
            <BrowserRouter>
                <Routes>
                    <Route path = "/" element={<TaskList/>}/>
                    <Route path = "/edit" element={<Foo/>}/>
                </Routes>
            </BrowserRouter>
        </TaskListProvider>
    )

    // return (
    //     <TaskListContext.Provider value={{getTaskList, setTaskList, updateTaskList, sortTaskList}}>
    //         <TaskContext.Provider value={{getTask, setTask}}>
    //             <div className="base-layout">
    //                 <h1 className="bg-red">Base Layout Header</h1>
    //                 <BrowserRouter>
    //                     <Routes>
    //                         <Route path="/" element={<MainPage/>}/>
    //                         <Route path="/edit" element={<EditTaskPage/>}/>
    //                     </Routes>
    //                 </BrowserRouter>
    //             </div>
    //         </TaskContext.Provider>
    //     </TaskListContext.Provider>
    // )
}
export default Base