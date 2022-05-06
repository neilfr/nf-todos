import {createContext, useContext, useState} from 'react'

export const TaskContext = createContext()

const TaskProvider = ({
    children
}) => {
    const [getTask, setTask] = useState([])

    return (
        <TaskContext.Provider value={{}}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTask = () => {
    const context = useContext(TaskContext)
    if (context === undefined) {
        throw new Error(
            'also not working'
        )
    }
    return context
}
export default TaskProvider

