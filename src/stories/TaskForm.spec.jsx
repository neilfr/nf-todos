import {TaskForm} from "./TaskForm"
import { render } from "@testing-library/react"
import {MemoryRouter} from "react-router-dom"
import React from 'react'
import {fireEvent} from "@testing-library/dom";

const mockLocation = {
    "pathname": "/edit",
    "search": "",
    "hash": "",
    "state": {
        "task": {
            "id": 0,
            "priority": "1",
            "description": "a",
            "complete": false
        }
    }
}

jest.mock("react-router-dom", () => {
    return {
        ...jest.requireActual('react-router-dom'),
        useLocation:()=>mockLocation
    }
})

const renderTaskForm = () => {
    return render(
        <MemoryRouter>
            <TaskForm/>
        </MemoryRouter>
    );
};

describe('TaskForm save button', () => {
    let getByText, getByLabelText

    beforeEach(() => {
        ({getByText, getByLabelText} = renderTaskForm());
    });

    it('disables if the description is empty', () => {
        const saveButton = getByText('Save')

        expect(saveButton).toBeVisible();
        expect(saveButton).toHaveAttribute('disabled')
    })

    it('enables if the user enters a description', () => {
        const saveButton = getByText('Save')
        const description = getByLabelText('Description:')

        fireEvent.change(description, {target: {value: 'abc'}})
        expect(description).toHaveValue('abc')
        expect(saveButton).not.toHaveAttribute('disabled')
    })

    it('disables if the description is deleted', () => {
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
    let getByLabelText
    it('it can mock useLocation', () => {
        ({getByLabelText} = renderTaskForm())
        const description = getByLabelText('Description:')
        expect(description).toHaveValue('a')
        const priority = getByLabelText('Priority:')
        expect(priority).toHaveValue(1)
    })
})