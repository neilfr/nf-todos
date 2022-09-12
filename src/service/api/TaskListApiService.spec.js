import {TaskListApiService} from "./TaskListApiService";

describe('task list api service', () => {
    beforeEach(() => {
        TaskListApiService.getTasks = jest.fn().mockReturnValue(5)
    })
    it('calls fetch get',  async () => {
        const response =  await TaskListApiService.getTasks()
        console.log(response)
        expect(response).toBe(5)
    })
})