import {TaskForm} from "./TaskForm"
import { render, screen } from "@testing-library/react"
import {MemoryRouter} from "react-router-dom"
import React from 'react'
import {fireEvent} from "@testing-library/dom";

describe('TaskForm tests', () => {
    it('disables the save button if the description is empty', () => {
        const { getByText, getByLabelText } = render(
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
        )

        const saveButton = getByText('Save')

        expect(saveButton).toBeVisible();
        expect(saveButton).toHaveAttribute('disabled')

        const description = getByLabelText('Description:')
        expect(description).toHaveValue('')

        fireEvent.change(description, {target: {value: 'abc'}})
        expect(description).toHaveValue('abc')

    })
})