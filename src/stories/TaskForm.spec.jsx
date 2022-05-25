import {TaskForm} from "./TaskForm"
import { render } from "@testing-library/react"
import {MemoryRouter} from "react-router-dom"
import React from 'react'
import {fireEvent} from "@testing-library/dom";

const renderTaskForm = () => {
    return render(
        <MemoryRouter initialEntries={
            [
                {
                    pathname:'/',
                    state:
                        {
                            task:
                                {
                                    id:null,
                                    priority:1,
                                    description:'',
                                    complete: false
                                }
                        }
                }
            ]
        }>
            <TaskForm/>
        </MemoryRouter>
    );
};

describe('TaskForm tests', () => {
    let getByText, getByLabelText

    beforeEach(() => {
        ({getByText, getByLabelText} = renderTaskForm());
    });

    it('disables the save button if the description is empty', () => {
        const saveButton = getByText('Save')

        expect(saveButton).toBeVisible();
        expect(saveButton).toHaveAttribute('disabled')
    })

    it('enables the save button if the user enters a description', () => {
        const saveButton = getByText('Save')
        const description = getByLabelText('Description:')

        fireEvent.change(description, {target: {value: 'abc'}})
        expect(description).toHaveValue('abc')
        expect(saveButton).not.toHaveAttribute('disabled')
    })

    it('disables the save button if the description is deleted', () => {
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