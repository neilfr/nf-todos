import React from 'react'
import {Priority} from "./Priority";
import {render} from "@testing-library/react"
import {screen} from "@testing-library/dom"

describe('Priority', () => {
    it('is a readonly input', () => {
        const priorityValue = 5
        render (
            <Priority priority={priorityValue}/>
        )
        const priority = screen.getByRole('textbox', {name:'Priority'})
        expect(priority).toHaveAttribute('readonly')
        expect(priority).toHaveValue(priorityValue.toString())

    })
})