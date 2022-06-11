import {TaskListReducer} from "./TaskListReducer";

describe('task list reducer tests', () => {
    it('updates task', () => {
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
        const updatedTask = {
            id: originalTaskId,
            priority: 5,
            description: "new description",
            complete: false
        }

        const newState = TaskListReducer(initialState, {type:'update', data:updatedTask})

        expect(newState).toEqual({
            nextTaskId: nextTaskId,
            tasks: [updatedTask]
        })
    })

    it('creates task', () => {
        const initialState = {
            nextTaskId:0,
            tasks:[]
        }
        const newTask = {
            id: null,
            priority: 1,
            description: "new task description",
            complete: false
        }

        const newState = TaskListReducer(initialState, {type:'create', data:newTask})

        expect(newState).toEqual({
            nextTaskId: initialState.nextTaskId+1,
            tasks: [{...newTask, id:0}]
        })
    })

    it('deletes task', () => {
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
    })
})

describe('sorting', ()=>{
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