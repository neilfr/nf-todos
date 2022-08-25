import React from 'react'
import {StageColumn} from "./StageColumn"
import {screen} from "@testing-library/dom"
import {render} from "@testing-library/react"


describe('StageColumn', () => {
    it('it renders children in a column with a title', () => {
        const columnTitle = "Column Title"
        const childText = "Foobar"

        render (
            <StageColumn title={columnTitle}>
                <p>{childText}</p>
            </StageColumn>
        )

        const stageColumn = screen.getByRole('stage-column', {name:columnTitle})
        expect(stageColumn).toBeInTheDocument()
        expect(stageColumn).toHaveTextContent(childText)
    })
})