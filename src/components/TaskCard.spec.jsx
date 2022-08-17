import React from 'react'
import {render} from "@testing-library/react"
import {TaskCard} from "./TaskCard";
import {MemoryRouter} from "react-router-dom"
import {StageContext} from "../context/StageContext";
import {fireEvent, getAllByRole, screen} from "@testing-library/dom";
import {TaskListContext} from "../context/TaskListContext";

let renderTask, mockTask, mockStages, mockEditTask, mockUpdateTaskStage, initialTaskStageId

describe('TaskCard',() => {
    beforeEach( () => {
        initialTaskStageId = 2

        mockEditTask = jest.fn()

        mockUpdateTaskStage = jest.fn()

        mockTask = {
            id:1,
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
        renderTask()
        const priority = screen.getByRole('textbox',{name: 'Priority'})
        expect(priority).toBeInTheDocument()
        expect(priority).toHaveValue(mockTask.priority.toString())
    })

    it('displays a task description', () => {
        renderTask()
        const description = screen.getByRole('textbox',{name: 'Description'})
        expect(description).toBeInTheDocument()
        expect(description).toHaveValue(mockTask.description)
    })

    it('sets initial value of stage select to the task stage_id', () => {
        renderTask()
        const stageSelect = screen.getByRole('combobox', {name: 'Task stage'})
        expect(stageSelect).toHaveValue(initialTaskStageId.toString())
    })

    it('displays all available task stages in stage select dropdown with correct aria-selected attribute', () => {
        renderTask()

        const stageSelect = screen.getByRole('combobox', {name: 'Task stage'})

        fireEvent.click(stageSelect)

        mockStages.forEach( (stage) => {
            const stageOption = screen.getByRole('option', {name: stage.description})
            expect(stageOption).toBeVisible()
            if (stage.id === initialTaskStageId)
            {
                expect(stageOption.getAttribute("aria-selected")).toBe("true")
            } else {
                expect(stageOption.getAttribute("aria-selected")).toBe("false")
            }
        })
    })

    it('calls the update task stage function when a stage is selected', () => {
        renderTask()

        const stageSelect = screen.getByRole('combobox', {name: 'Task stage'})

        fireEvent.change(stageSelect, { target: {value:1}})

        expect(mockUpdateTaskStage).toHaveBeenCalled()
        expect(mockUpdateTaskStage).toHaveBeenCalledWith(mockTask.id, "1")
    })

    it('calls the edit task function when task is clicked', () => {

        renderTask()

        const taskSelect = screen.getByRole('button')
        fireEvent.click(taskSelect)

        expect(mockEditTask).toHaveBeenCalled()
        expect(mockEditTask).toHaveBeenCalledWith(mockTask)

    })
})