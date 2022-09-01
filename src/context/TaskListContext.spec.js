import React from 'react'
import {TaskListProvider} from "./TaskListContext";
import {MemoryRouter} from "react-router-dom"
import { render } from "@testing-library/react"

import {getTasks} from "../service/api/TaskListApiService"

jest.mock('../service/api/TaskListApiService')

describe('initial state setup', ()=> {
    const TestComponent = (props) => {
        return(
            <div>
                {/*<label for="taskListCount">TaskListCount:</label>*/}
                {/*<input id="taskListCount" type="number" value={props.tasks.length}/>*/}
                foobar
            </div>
        )
    }

    const renderWithContext = () => {

        return render(
            <MemoryRouter>
                <TaskListProvider>
                    <TestComponent></TestComponent>
                </TaskListProvider>
            </MemoryRouter>
        )
    }

    it('foo', () => {
        renderWithContext()
        expect(getTasks).toHaveBeenCalled()
    })

})

