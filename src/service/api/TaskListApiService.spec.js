import {TaskListApiService} from "./TaskListApiService";

describe('task list api service', () => {
    it('calls fetch', async () => {
        fetch = jest.fn()
        const response = await TaskListApiService.getTasks()
        expect(fetch).toHaveBeenCalledWith("http://localhost:8000/api/tasks")
    })
    it('calls fetch with post', async () => {
        fetch = jest.fn()
        const response = await TaskListApiService.destroyTask(5)
        expect(fetch).toHaveBeenCalled()
    })

    it('calls getTasks',  async () => {
        TaskListApiService.getTasks = jest.fn().mockReturnValue(5)
        const response =  await TaskListApiService.getTasks()
        expect(response).toBe(5)
    })
})