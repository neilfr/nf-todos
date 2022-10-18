import React, {createContext, useEffect, useReducer} from "react";
import {actions, TaskListReducer} from "../reducers/TaskListReducer";
import {TaskListApiService} from "../service/api/TaskListApiService";
import {useNavigate} from "react-router-dom";
import {navigate} from "@storybook/addon-links";

export const TaskListContext = createContext('')

const DEFAULT_STAGE_ID = 1
const DEFAULT_PRIORITY = 1

export const defaultTask = {
    id:null,
    priority: DEFAULT_PRIORITY,
    description:'',
    stage_id: DEFAULT_STAGE_ID
}

export const TaskListProvider = ({
    children
}) => {
    const [state, dispatch] = useReducer(TaskListReducer, {
        tasks:[],
        currentTask: {}
    })

    const updateTaskStage = async (task_id, stage_id) => {
        const task = await TaskListApiService.updateTask(task_id, {stage_id:stage_id})
        dispatch({type: actions.UPDATE, data:task})
    }

    let navigate = useNavigate()

    const gotoHome = () => {
        navigate("/")
    }

    const gotoTaskForm = () => {
        navigate("/edit")
    }

    const editTask = (task) => {
        dispatch({type:actions.SELECT, data:task})
        gotoTaskForm()
    }

    const cancel = () => {
        gotoHome()
    }

    const deleteTask = async (task) => {
        await TaskListApiService.destroyTaskAxios(task.id)
        // await TaskListApiService.destroyTask(task.id)
        dispatch({type: actions.DELETE, data:task})
        gotoHome()
    }

    const addNewTask = () => {
        dispatch({type:actions.NEW})
        gotoTaskForm()
    }

    const updateOrCreateTask = async (taskToCreateOrUpdate) => {
        if (taskToCreateOrUpdate.id === null) {
            // const task = await TaskListApiService.createTask(taskToCreateOrUpdate)
            const task = await TaskListApiService.createTaskAxios(taskToCreateOrUpdate)
            dispatch({type: actions.CREATE, data:task})
        } else {
            const updatedTask = await TaskListApiService.updateTaskAxios(taskToCreateOrUpdate.id, taskToCreateOrUpdate)
            // const updatedTask = await TaskListApiService.updateTask(taskToCreateOrUpdate.id, taskToCreateOrUpdate)
            dispatch({type: actions.UPDATE, data:updatedTask})
        }
        gotoHome()
    }

    useEffect( async () => {
        const tasks = await TaskListApiService.getTasksAxios()
        // const tasks = await TaskListApiService.getTasks()
        dispatch({
            type:actions.INITIALIZE,
            data:{"tasks":tasks}
        })
    },[])

    return (
        <TaskListContext.Provider value={{cancel, addNewTask, updateOrCreateTask, deleteTask, updateTaskStage, editTask, tasks:state.tasks, currentTask:state.currentTask}}>
            {children}
        </TaskListContext.Provider>
    )
}