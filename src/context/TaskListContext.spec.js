import React from 'react'
import {TaskListProvider} from "./TaskListContext";
import {MemoryRouter} from "react-router-dom"
import {act, render} from "@testing-library/react"

import {TaskListApiService} from "../service/api/TaskListApiService"
import {FetchApiService} from "../service/api/FetchApiService";

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
        expect(FetchApiService.getTasks).toHaveBeenCalled()
    })

    it('calls fetch when getting stages',  async () => {
        fetch = jest.fn().mockReturnValue({
            ok: true,
            status: 200,
            json: async () => 5
        })
        const response =  await FetchApiService.getStages()
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8000/api/stages"
        )
        expect(response).toBe(5)
    })

})

