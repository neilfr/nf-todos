import React from 'react'
import {render} from "@testing-library/react"
import {TaskCard} from "./TaskCard";
import {MemoryRouter} from "react-router-dom"
import {StageContext} from "../context/StageContext";
import {fireEvent, screen} from "@testing-library/dom";
import {TaskListContext} from "../context/TaskListContext";

let renderTask, task, stages, mockEditTask, mockUpdateTaskStage, initialTaskStageId

describe('TaskCard',() => {
    beforeEach( () => {
        initialTaskStageId = 2

        mockEditTask = jest.fn()

        mockUpdateTaskStage = jest.fn()

        task = {
            id:1,
            description:'my task',
            priority:5,
            stage_id:initialTaskStageId
        }

        stages = [
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
                    <StageContext.Provider value={{stages:stages}}>
                        <TaskListContext.Provider value={{updateTaskStage:mockUpdateTaskStage, editTask:mockEditTask}}>
                            <TaskCard task={task}/>
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
        expect(priority).toHaveValue(task.priority.toString())
    })

    it('displays a task description', () => {
        renderTask()
        const description = screen.getByRole('textbox',{name: 'Description'})
        expect(description).toBeInTheDocument()
        expect(description).toHaveValue(task.description)
    })

    it('displays the initially selected stage text', () => {
        renderTask()
        const selectedStageText = screen.getByText("To Do")
        expect(selectedStageText).toBeInTheDocument()
    })

    it('sets initial value of stage select to the task stage_id', () => {
        renderTask()
        const stageSelect = screen.getByRole('combobox', {name: 'Task stage'})
        expect(stageSelect).toHaveValue(initialTaskStageId.toString())
        const selectedStageOption = screen.getByRole('option', {name: "To Do"})
        expect(selectedStageOption).toHaveAttribute('aria-selected', "true")
    })

    it('displays all available task stages in stage select dropdown with correct aria-selected attribute', () => {
        renderTask()

        const stageSelect = screen.getByRole('combobox', {name: 'Task stage'})

        fireEvent.click(stageSelect)

        stages.forEach( (stage) => {
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
        expect(mockUpdateTaskStage).toHaveBeenCalledWith(task.id, "1")
    })

    it('calls the edit task function when task is clicked', () => {

        renderTask()

        const taskSelect = screen.getByRole('button', {name:task.description})
        fireEvent.click(taskSelect)

        expect(mockEditTask).toHaveBeenCalled()
        expect(mockEditTask).toHaveBeenCalledWith(task)

    })
})