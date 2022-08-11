import React from 'react'
import { render } from "@testing-library/react"
import {Task} from "./Task";
import {MemoryRouter} from "react-router-dom"
import {StageContext, StageProvider} from "../context/StageContext";
import {fireEvent, getByRole} from "@testing-library/dom";


describe('Task',() => {
    it('displays a task priority and description', () => {
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
    it('displays task stages in stage select dropdown', () => {
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

        const {getByLabelText} = renderTask()

        const stageSelect = getByLabelText('stage-select')
        expect(stageSelect).toHaveValue("1")

        fireEvent.click(stageSelect)
        // gotta grab the options somehow
        const stageOptions = getByRole("option")
        expect().toBeVisible()

    })

})