import React, {createContext, useEffect, useReducer} from "react";
import {actions, TaskListReducer} from "../reducers/TaskListReducer";
import {useNavigate} from "react-router-dom";
// import {AxiosApiService} from "../service/api/AxiosApiService";
import { getTasks, updateTask, createTask, destroyTask, getStages } from "../service/api/ApiService";

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
        const task = await updateTask(task_id, {stage_id:stage_id})
        // const task = await AxiosApiService.updateTaskAxios(task_id, {stage_id:stage_id})
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
        // await AxiosApiService.destroyTaskAxios(task.id)
        await destroyTask(task.id)
        dispatch({type: actions.DELETE, data:task})
        gotoHome()
    }

    const addNewTask = () => {
        dispatch({type:actions.NEW})
        gotoTaskForm()
    }

    const updateOrCreateTask = async (taskToCreateOrUpdate) => {
        if (taskToCreateOrUpdate.id === null) {
            const task = await createTask(taskToCreateOrUpdate)
            // const task = await AxiosApiService.createTaskAxios(taskToCreateOrUpdate)
            dispatch({type: actions.CREATE, data:task})
        } else {
            // const updatedTask = await AxiosApiService.updateTaskAxios(taskToCreateOrUpdate.id, taskToCreateOrUpdate)
            const updatedTask = await updateTask(taskToCreateOrUpdate.id, taskToCreateOrUpdate)
            dispatch({type: actions.UPDATE, data:updatedTask})
        }
        gotoHome()
    }

    useEffect( async () => {
        // const tasks = await AxiosApiService.getTasksAxios()
        const tasks = await getTasks()
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