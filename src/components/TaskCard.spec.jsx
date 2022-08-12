import React from 'react'
import {render} from "@testing-library/react"
import {TaskCard} from "./TaskCard";
import {MemoryRouter} from "react-router-dom"
import {StageContext} from "../context/StageContext";
import {fireEvent} from "@testing-library/dom";

let renderTask, mockTask, mockStages, initialTaskStage

describe('TaskCard',() => {
    beforeEach( () => {
        initialTaskStage = 2

        mockTask = {
            description:'my task',
            priority:5,
            stage_id:initialTaskStage
        }

        mockStages = [
            {
                id:1,
                description:'Backlog'
            },
            {
                id:2,
                description:'To Do'
            }
        ]

        renderTask = () => {
            return render(
                <StageContext.Provider value={{stages:mockStages}}>
                    <MemoryRouter>
                        <TaskCard task={mockTask}/>
                    </MemoryRouter>
                </StageContext.Provider>
            )
        }
    })

    it('displays a task priority', () => {
        const {getByText} = renderTask()

        expect(getByText(mockTask.priority)).toBeInTheDocument()
    })

    it('displays a task description', () => {
        const {getByText} = renderTask()

        expect(getByText(mockTask.description)).toBeInTheDocument()
    })

    it('displays task stage as initial selected value in stage select dropdown', () => {
        const {getByLabelText} = renderTask()

        const stageSelect = getByLabelText(`stage-select-for-${mockTask.description}`)
        expect(stageSelect).toHaveValue(initialTaskStage.toString())
    })

    it('displays all available task stages in stage select dropdown', () => {
        const {getByLabelText} = renderTask()

        const stageSelect = getByLabelText(`stage-select-for-${mockTask.description}`)

        fireEvent.click(stageSelect)
        mockStages.forEach( (stage) => {
            const stageOption = getByLabelText(`stage-select-option-${stage.description}`)
            expect(stageOption).toBeVisible()
        })
    })

    it('navigates to the task edit endpoint when task is clicked', () => {
        const {getByLabelText} = renderTask()

        const taskSelect = getByLabelText(`task-select-for-${mockTask.description}`)
        fireEvent.click(taskSelect)

        expect('editTask').toHaveBeenCalled()

    })
})