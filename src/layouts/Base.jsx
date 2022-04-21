import MainPage from "../pages/MainPage"
import {BrowserRouter, Routes, Route, useNavigate, useHistory} from "react-router-dom"
import {EditTaskPage} from "../pages/EditTaskPage"
import React, {useState} from "react";
import {CurrentTaskIdContext} from "../context/CurrentTaskIdContext";
import {TaskListContext} from "../context/TaskListContext";


const Base = () => {
    const [getCurrentTaskId, setCurrentTaskId] = useState(null)
    const [getTaskList2, setTaskList2] = useState([])

    // put update here and pass it via the provider.  then task form runs the function there.
    // update state of tasklistcontext here.

    const updateTaskList = (updatedTask) => {
        //sort here
        const taco = getTaskList2.map((task)=>{
            return task.id === updatedTask.id ? updatedTask : task
        })

        setTaskList2(taco.length>0 ? taco.sort(prioritySort) : taco)

    }

    //todo: sorting like strings instead of integers
    const prioritySort = (a,b) => {
        if(a.priority>b.priority) return 1
        if(a.priority<b.priority) return -1
        return 0
    }

    const descriptionSort = (a,b) => {
        if(a.description>b.description) return 1
        if(a.description<b.description) return -1
        return 0
    }

    const sortBy = (property) => {
        switch (property){
            case 'priority':
                return getTaskList2.sort(prioritySort)
                break
            case 'description':
                return getTaskList2.sort(descriptionSort)
                break
            default:
                return getTaskList2.sort(prioritySort)
        }
    }


    return (
        <TaskListContext.Provider value={{getTaskList2, setTaskList2, updateTaskList}}>
            <CurrentTaskIdContext.Provider value={{getCurrentTaskId, setCurrentTaskId}}>
                <div className="base-layout">
                    <h1 className="bg-red">Base Layout Header</h1>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/edit" element={<EditTaskPage/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            </CurrentTaskIdContext.Provider>
        </TaskListContext.Provider>
    )
}
export default Base