import React from 'react'
import {TaskListProvider} from "./TaskListContext";
import {MemoryRouter} from "react-router-dom"
import {act, render} from "@testing-library/react"

import {TaskListApiService} from "../service/api/TaskListApiService"

jest.mock('../service/api/TaskListApiService')

describe('initial state setup', ()=> {
    const TestComponent = (props) => {
        return(
            <div>
                <button>Create</button>
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

    it('calls getTasks from api when a component is rendered with the context', () => {
        act( () => {
            renderWithContext()
        })
        expect(TaskListApiService.getTasks).toHaveBeenCalled()
    })

})

