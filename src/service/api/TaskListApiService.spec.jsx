// import * as taskListApiService from "./TaskListApiService";
// jest.enableAutomock()
import {getTasks} from "./TaskListApiService";

jest.mock('./TaskListApiService')
describe('api service test', () => {
    // it('does stuff', () => {
    //     taskListApiService.updateTask = jest.fn()
    //     const response = taskListApiService.updateTask(1,{})
    //     expect(true).toBeTruthy()
    // })
    it('does more stuff', () => {
        const response = getTasks()
        expect(getTasks).toHaveBeenCalled()
    })
})