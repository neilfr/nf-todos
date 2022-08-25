import {actions, TaskListReducer} from "./TaskListReducer";
import {defaultTask} from "../context/TaskListContext";

describe('TaskListReducer', () => {
    const taskList = [
        {
            id: 1,
            priority: 2,
            description: "first description",
            complete: true
        },{
            id: 2,
            priority: 3,
            description: "second description",
            complete: false
        }
    ]

    it('initializes the task list with provided tasks', () => {
        const initialState = {}

        const newState = TaskListReducer(initialState,{type:actions.INITIALIZE, data:{tasks:taskList}})

        expect(newState).toEqual({
            tasks:taskList,
            currentTask:{}
        })
    })

    it('updates task list state when task is updated', () => {
        const initialState = {
            tasks:taskList,
            currentTask:{}
        }

        const updatedTask = {
            id: 1,
            priority: 5,
            description: "new description",
            complete: false
        }

        const newState = TaskListReducer(initialState, {type:actions.UPDATE, data:updatedTask})

        expect(newState).toEqual({
            tasks: [
                updatedTask,
                initialState.tasks[1]
            ],
            currentTask: {}
        })

    })

    it('create a new task and sets it as the current task in state', () => {
        const initialState = {
            tasks:[],
            currentTask:{}
        }

        const newState = TaskListReducer(initialState, {type:actions.NEW})

        expect(newState).toEqual({
            tasks:[],
            currentTask:defaultTask
        })
    })

    it('adds newly created task to task list state', () => {
        const initialState = {
            tasks:[],
            currentTask:{}
        }

        const newState = TaskListReducer(initialState, {type:actions.CREATE, data:taskList[0]})

        expect(newState).toEqual({
            tasks: [taskList[0]],
            currentTask:{}
        })

    })

    it('deletes task from task list and persists it', () => {

        const initialState = {
            tasks:taskList,
            currentTask:{}
        }

        const newState = TaskListReducer(initialState, {type:actions.DELETE, data:taskList[0]})

        expect(newState).toEqual({
            tasks:[taskList[1]],
            currentTask:{}
        })

    })

    it('sets current task when task is selected', () => {

        const initialState = {
            tasks: taskList,
            currentTask: {}
        }
        const taskToBeSelected = taskList[1]

        const newState = TaskListReducer(initialState, {type:actions.SELECT, data:taskToBeSelected})

        expect(newState).toEqual({
            tasks: taskList,
            currentTask: taskToBeSelected
        })
    })
})

describe('sort task list', ()=>{

    let taskList, taskToBeCreated

    beforeEach(()=>{
        taskList = [
            {
                id: 1,
                priority: 2,
                description: "a description",
                complete: true
            },{
                id: 2,
                priority: 2,
                description: "a description",
                complete: true
            }
        ]
        taskToBeCreated = {
            id: 3,
            priority: 2,
            description: "a description",
            complete: true
        }
    })

    it('sorts tasks by description in ascending order when a new task is added', () => {
        taskList[1]["description"] = "z description"
        taskToBeCreated.description = "h description"
        const initialState = {
            tasks:taskList,
            currentTask:{}
        }

        const newState = TaskListReducer(initialState, {type:'create', data:taskToBeCreated})

        expect(newState.tasks).toEqual([
            taskList[0],
            taskToBeCreated,
            taskList[1]
        ])
    })

    it('sorts tasks by priority in ascending order when a new task is added', () => {
        taskList[1]["priority"]=5
        taskToBeCreated.priority=3

        const initialState = {
            tasks:taskList,
            currentTask:{}
        }

        const newState = TaskListReducer(initialState, {type:'create', data:taskToBeCreated})

        expect(newState.tasks).toEqual([
            taskList[0],
            taskToBeCreated,
            taskList[1]
        ])
    })

    it('sorts incomplete tasks to the top when a new task is added', () => {
        taskToBeCreated.complete = false
        const initialState = {
            tasks:taskList,
            currentTask:{}
        }

        const newState = TaskListReducer(initialState, {type:'create', data:taskToBeCreated})

        expect(newState.tasks).toEqual([
            taskToBeCreated,
            taskList[0],
            taskList[1]
        ])
    })
})