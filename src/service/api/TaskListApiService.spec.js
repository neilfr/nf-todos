import {TaskListApiService} from "./TaskListApiService";

describe('task list api service', () => {
    it('calls fetch when getting tasks',  async () => {
        fetch = jest.fn().mockReturnValue({
            ok: true,
            status: 200,
            json: async () => 5
        })
        const response =  await TaskListApiService.getTasks()
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8000/api/tasks"
        )
        expect(response).toBe(5)
    })

    it('calls fetch and returns the created task when creating new task', async () => {
        const payload = {foo:"bar"}
        fetch = jest.fn().mockReturnValue({
            ok: true,
            status: 200,
            json: async () => { return {data:payload}}
        })
        const response =  await TaskListApiService.createTask(payload)
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8000/api/tasks/",
            {
                "body": "{\"foo\":\"bar\"}",
                "headers": {"Content-type": "application/json"},
                "method": "POST"
            }
        )
        expect(response).toBe(payload)
    })
    it('calls fetch and returns the deleted task when deleting task', async () => {
        const task = {
            id:5
        }
        fetch = jest.fn().mockReturnValue({
            ok: true,
            status: 200,
            json: async () => { return task}
        })
        const response =  await TaskListApiService.destroyTask(task.id)
        expect(fetch).toHaveBeenCalledWith(
            `http://localhost:8000/api/tasks/${task.id}`,
            {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json",
                },
            }
        )
        expect(response).toBe(task)
    })
    it('calls fetch and returns the updated task when updating task', async () => {
        const taskid = 5
        const payload = {
            id:taskid,
            foo:"updated value"
        }
        fetch = jest.fn().mockReturnValue({
            ok: true,
            status: 200,
            json: async () => { return {data:payload}}
        })
        const response =  await TaskListApiService.updateTask(taskid, payload)
        expect(fetch).toHaveBeenCalledWith(
            `http://localhost:8000/api/tasks/${taskid}`,
            {
                method: 'PATCH',
                headers: {
                    "Content-type": "application/json",
                },
                body: "{\"id\":5,\"foo\":\"updated value\"}"
            }
        )
        expect(response).toBe(payload)
    })

})