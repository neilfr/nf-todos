import React, {createContext, useContext} from "react";

export const TaskListContext = createContext()

const TaskListProvider = ({
    children
                          }) => {

    return (
        <TaskListContext.Provider value={{x:'y'}}>
            {children}
        </TaskListContext.Provider>
    )
}

export const useTaskList = () => {
    const context = useContext(TaskListContext)
    if (context === undefined) {
        throw new Error(
            'not working'
        )
    }
    return context
}
export default TaskListProvider