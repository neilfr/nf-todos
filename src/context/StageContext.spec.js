import React from 'react'
import {StageProvider} from "./StageContext";
import {MemoryRouter} from "react-router-dom"
import { render } from "@testing-library/react"
import {FetchApiService} from "../service/api/FetchApiService";

jest.mock('../service/api/FetchApiService')

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
        expect(FetchApiService.getStages).toHaveBeenCalled()
    })

})

