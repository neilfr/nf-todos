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