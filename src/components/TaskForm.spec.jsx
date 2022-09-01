import {TaskForm} from "./TaskForm"
import { render } from "@testing-library/react"
import {MemoryRouter} from "react-router-dom"
import React from 'react'
import {fireEvent, screen} from "@testing-library/dom";
import {TaskListContext} from "../context/TaskListContext";

const currentTask = {
    "id": 0,
    "priority": "1",
    "description": "a",
    "complete": false
}

const mockUpdateOrCreateTask = jest.fn()

const renderTaskForm = () => {
    return render(
        <TaskListContext.Provider value={{currentTask:currentTask, updateOrCreateTask:mockUpdateOrCreateTask}}>
            <MemoryRouter>
                <TaskForm/>
            </MemoryRouter>
        </TaskListContext.Provider>
    );
};

describe('TaskForm save button', () => {
    let getByText, getByLabelText

    beforeEach(() => {
        ({getByText, getByLabelText} = renderTaskForm());
    });

    it('enables if the user enters a description', () => {
        const saveButton = getByText('Save')
        const description = getByLabelText('Description:')

        fireEvent.change(description, {target: {value: 'abc'}})
        expect(description).toHaveValue('abc')
        expect(saveButton).not.toHaveAttribute('disabled')
    })

    it('disables if the description is empty', () => {
        const saveButton = getByText('Save')
        const description = getByLabelText('Description:')

        fireEvent.change(description, {target: {value: 'abc'}})
        expect(description).toHaveValue('abc')
        expect(saveButton).not.toHaveAttribute('disabled')

        fireEvent.change(description, {target: {value: ''}})
        expect(description).toHaveValue('')
        expect(saveButton).toHaveAttribute('disabled')
    })

    it("calls the context's updateOrCreateTask when the save button is clicked", () => {
        const saveButton = screen.getByRole('button',{name:'Save'})
        fireEvent.click(saveButton)
        expect(mockUpdateOrCreateTask).toHaveBeenCalledWith(currentTask)
    })

})