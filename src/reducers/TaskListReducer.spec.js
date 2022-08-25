import {TaskListReducer} from "./TaskListReducer";

describe('task list reducer tests', () => {

    it('updates task list when task is updated', () => {
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

    it('adds created task to task list', () => {
        const initialState = {
            tasks:[],
            currentTask:{}
        }

        const newTask = {
            id: null,
            priority: 1,
            description: "new task description",
            complete: false
        }

        const newState = TaskListReducer(initialState, {type:'create', data:newTask})

        expect(newState).toEqual({
            tasks: [{...newTask, id:0}],
            currentTask:{}
        })

    })

    it('deletes task from task list and persists it', () => {
        const originalTaskId = 0
        const nextTaskId = originalTaskId+1
        const originalTask = {
            id: originalTaskId,
            priority: 1,
            description: "old description",
            complete: false
        }
        const initialState = {
            nextTaskId:nextTaskId,
            tasks:[originalTask]
        }

        const newState = TaskListReducer(initialState, {type:'delete', data:originalTask})

        expect(newState).toEqual({
            nextTaskId: nextTaskId,
            tasks:[]
        })

        expect(global.Storage.prototype.setItem).toHaveBeenCalledTimes(1)
        expect(JSON.parse(mockStorage['tasks'])).toEqual([])
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