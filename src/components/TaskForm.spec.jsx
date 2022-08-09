import {TaskForm} from "./TaskForm"
import { render } from "@testing-library/react"
import {MemoryRouter} from "react-router-dom"
import React from 'react'
import {fireEvent} from "@testing-library/dom";
import {TaskListContext} from "../context/TaskListContext";

const currentTask = {
    "id": 0,
    "priority": "1",
    "description": "a",
    "complete": false
}

const renderTaskForm = () => {
    return render(
        <TaskListContext.Provider value={{currentTask:currentTask}}>
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
})

describe('mock tests', () => {
    let getByLabelText, getByText
    it('sets localstorage nextTaskId to the next task id when saving a valid task', () => {
        // set the current nextTaskId to 1

        // render the task form with a valid new task (id is null)
        ({getByText} = renderTaskForm())

        // user clicks save
        const saveButton = getByText('Save')
        fireEvent.click(saveButton)

        // assert that local storage set item is called with nextTaskId as 2
        expect('localStorage.setItem()').toHaveBeenCalled()
    })
})