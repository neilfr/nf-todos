import React from 'react'
import {StageProvider} from "./StageContext";
import {MemoryRouter} from "react-router-dom"
import { render } from "@testing-library/react"
import {StageApiService} from "../service/api/StageApiService";

jest.mock('../service/api/StageApiService')

describe('initial state setup', ()=> {
    const TestComponent = (props) => {
        return(
            <div>
                <p>hello world</p>
            </div>
        )
    }

    const renderWithContext = () => {

        return render(
            <MemoryRouter>
                <StageProvider>
                    <TestComponent></TestComponent>
                </StageProvider>
            </MemoryRouter>
        )
    }

    it('calls getStages from api when a component is rendered with the context', () => {
        renderWithContext()
        expect(StageApiService.getStages).toHaveBeenCalled()
    })

})

