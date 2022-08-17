import React from 'react'
import {render} from "@testing-library/react"
import {TaskCard} from "./TaskCard";
import {MemoryRouter} from "react-router-dom"
import {StageContext} from "../context/StageContext";
import {fireEvent, getAllByLabelText, getAllByRole, screen} from "@testing-library/dom";
import {TaskListContext} from "../context/TaskListContext";

let renderTask, mockTask, mockStages, mockEditTask, mockUpdateTaskStage, initialTaskStageId

describe('TaskCard',() => {
    beforeEach( () => {
        initialTaskStageId = 2

        mockEditTask = jest.fn()

        mockUpdateTaskStage = jest.fn()

        mockTask = {
            description:'my task',
            priority:5,
            stage_id:initialTaskStageId
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
                <MemoryRouter>
                    <StageContext.Provider value={{stages:mockStages}}>
                        <TaskListContext.Provider value={{updateTaskStage:mockUpdateTaskStage, editTask:mockEditTask}}>
                            <TaskCard task={mockTask}/>
                        </TaskListContext.Provider>
                    </StageContext.Provider>
                </MemoryRouter>
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

    it('calls the update task stage function when a stage is selected', () => {
        const {getByLabelText} = renderTask()

        const stageSelect = getByLabelText(`stage-select-for-${mockTask.description}`)

        fireEvent.click(stageSelect)

        const selectedStageOption = getByLabelText(`stage-select-option-${mockStages[0].description}`)
        fireEvent.change(selectedStageOption)

        const options = getAllByRole('options')
        console.log('options', options)

        // expect(selectedStageOption.selected).toBeTruthy()

        // expect(mockUpdateTaskStage).toHaveBeenCalled()
    })

    it('calls the edit task function when task is clicked', () => {

        const {getByLabelText} = renderTask()

        const taskSelect = screen.getByRole('button')
        // const taskSelect = getByLabelText(`task-select-for-${mockTask.description}`)
        fireEvent.click(taskSelect)

        expect(mockEditTask).toHaveBeenCalled()
        expect(mockEditTask).toHaveBeenCalledWith(mockTask)

    })
})