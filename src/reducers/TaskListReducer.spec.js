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
})