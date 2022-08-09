import React from 'react'
import { render } from "@testing-library/react"
import {Task} from "./Task";
import {MemoryRouter} from "react-router-dom"
import {StageContext, StageProvider} from "../context/StageContext";

describe('Task',() => {
    it('displays a task priority', () => {

        const mockTask = {
            description:'my task',
            priority:5,
            stage_id:2
        }

        const mockStages = [
            {
                id:1,
                description:'Backlog'
            },
            {
                id:1,
                description:'Backlog'
            }
        ]

        const renderTask = () => {
            return render(
                <StageContext.Provider value={{stages:mockStages}}>
                    <MemoryRouter>
                        <Task task={mockTask}/>
                    </MemoryRouter>
                </StageContext.Provider>
            )
        }

        const {getByText} = renderTask()

        expect(getByText(mockTask.description)).toBeInTheDocument()
        expect(getByText(mockTask.priority)).toBeInTheDocument()
    })
})