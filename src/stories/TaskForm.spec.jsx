import {TaskForm} from "./TaskForm"
import { render, screen } from "@testing-library/react"
import {MemoryRouter} from "react-router-dom"
import React from 'react'

describe('TaskForm tests', () => {
    it('disables the save button if the description is empty', () => {
        const { getByText } = render(
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
    })
})