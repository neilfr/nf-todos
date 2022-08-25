import React from 'react'
import {Description} from "./Description";
import {render} from "@testing-library/react"
import {screen} from "@testing-library/dom"

describe('Description', () => {
    it('is a readonly input', () => {
        const descriptionValue = 'my task'
        render (
            <Description description={descriptionValue}/>
        )
        const description = screen.getByRole('textbox', {name:'Description'})
        expect(description).toHaveAttribute('readonly')
        expect(description).toHaveValue(descriptionValue)

    })
})