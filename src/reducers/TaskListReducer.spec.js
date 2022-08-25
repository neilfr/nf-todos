import {TaskListReducer} from "./TaskListReducer";
import {defaultTask} from "../context/TaskListContext";

describe('TaskListReducer', () => {
    it('initializes the task list with provided tasks', () => {
        const initialState = {}
        const initialTasks = [
            {
                id: 1,
                priority: 2,
                description: "first description",
                complete: false
            },{
                id: 2,
                priority: 3,
                description: "second description",
                complete: true
            }
        ]

        const newState = TaskListReducer(initialState,{type:'initialize', data:{tasks:initialTasks}})

        expect(newState).toEqual({
            tasks:initialTasks,
            currentTask:{}
        })
    })

    it('updates task list state when task is updated', () => {
        const originalTask = {
            id: 1,
            priority: 1,
            description: "old description",
            complete: false
        }

        const initialState = {
            tasks:[originalTask],
            currentTask:{}
        }

        const updatedTask = {
            id: 1,
            priority: 5,
            description: "new description",
            complete: false
        }

        const newState = TaskListReducer(initialState, {type:'update', data:updatedTask})

        expect(newState).toEqual({
            tasks: [updatedTask],
            currentTask: {}
        })

    })

    it('create a new task and sets it as the current task in state', () => {
        const initialState = {
            tasks:[],
            currentTask:{}
        }

        const newState = TaskListReducer(initialState, {type:'new'})

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

        const newTaskFromDB = {
            id: 1,
            priority: 1,
            description: "new task description",
            complete: false
        }

        const newState = TaskListReducer(initialState, {type:'create', data:newTaskFromDB})

        expect(newState).toEqual({
            tasks: [newTaskFromDB],
            currentTask:{}
        })

    })

    it('deletes task from task list and persists it', () => {
        const originalTask = {
            id: 1,
            priority: 1,
            description: "old description",
            complete: false
        }
        const initialState = {
            tasks:[originalTask],
            currentTask:{}
        }

        const newState = TaskListReducer(initialState, {type:'delete', data:originalTask})

        expect(newState).toEqual({
            tasks:[],
            currentTask:{}
        })

    })

    it('sets current task when task is selected', () => {

        const taskToBeSelected = {
            id: 2,
            priority: 3,
            description: "second description",
            complete: true
        }
        let tasks = [
            {
                id: 1,
                priority: 2,
                description: "first description",
                complete: false
            }, taskToBeSelected
        ]
        const initialState = {
            tasks: tasks,
            currentTask: {}
        }

        const newState = TaskListReducer(initialState, {type:'select', data:taskToBeSelected})

        expect(newState).toEqual({
            tasks:tasks,
            currentTask: taskToBeSelected
        })
    })
})

describe('sort task list', ()=>{
    let originalTaskId, nextTaskId, originalTask, initialState

    beforeEach(()=>{
        originalTaskId = 0
        nextTaskId = originalTaskId+1
        originalTask = {
            id: originalTaskId,
            priority: 5,
            description: "z original description",
            complete: true
        }
        initialState = {
            nextTaskId:nextTaskId,
            tasks:[originalTask]
        }
    })

    it('sorts tasks by description in ascending order when a new task is added', () => {
        const newTask = {
            id: null,
            priority: 5,
            description: "z new task description",
            complete: true
        }

        const newState = TaskListReducer(initialState, {type:'create', data:newTask})

        expect(newState.tasks).toEqual([{...newTask, id:originalTaskId+1}, originalTask])
    })

    it('sorts tasks by priority in ascending order when a new task is added', () => {
        const newTask = {
            id: null,
            priority: 1,
            description: "z original description",
            complete: true
        }

        const newState = TaskListReducer(initialState, {type:'create', data:newTask})

        expect(newState.tasks).toEqual([{...newTask, id:originalTaskId+1}, originalTask])
    })

    it('sorts incomplete tasks to the top when a new task is added', () => {
        const newTask = {
            id: null,
            priority: 5,
            description: "z original description",
            complete: false
        }

        const newState = TaskListReducer(initialState, {type:'create', data:newTask})

        expect(newState.tasks).toEqual([{...newTask, id:originalTaskId+1}, originalTask])
    })
})