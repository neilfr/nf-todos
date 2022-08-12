import React from 'react'
import { render } from "@testing-library/react"
import {Task} from "./Task";
import {MemoryRouter} from "react-router-dom"
import {StageContext} from "../context/StageContext";
import {fireEvent} from "@testing-library/dom";

let renderTask, mockTask, mockStages

describe('Task',() => {
    beforeEach( () => {
        mockTask = {
            description:'my task',
            priority:5,
            stage_id:1
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
                        <Task task={mockTask}/>
                    </MemoryRouter>
                </StageContext.Provider>
            )
        }
    })

    it('displays a task priority and description', () => {
        const {getByText} = renderTask()

        expect(getByText(mockTask.description)).toBeInTheDocument()
        expect(getByText(mockTask.priority)).toBeInTheDocument()
    })

    it('displays task stages in stage select dropdown', () => {
        const {getByLabelText} = renderTask()

        const stageSelect = getByLabelText('stage-select')
        expect(stageSelect).toHaveValue("1")

        fireEvent.click(stageSelect)
        mockStages.forEach( (stage) => {
            const stageOption = getByLabelText(`stage-select-option-${stage.description}`)
            expect(stageOption).toBeVisible()
        })

    })

})