

// import {foobar} from "./myApi";
import {getTasks} from "../service/api/TaskListApiService";

describe('getTasks', () => {
    test('works', async () => {

        const json = await getTasks()
console.log('json', json)
        expect(true).toBeTruthy
        // expect(Array.isArray(json)).toEqual(true)
        // expect(json.length).toEqual(1)
        // expect(json[0]).toBe(5)
    })
})
