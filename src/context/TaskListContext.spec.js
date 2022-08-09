import React from 'react'
import {TaskListContext} from "./TaskListContext";
import { render } from "@testing-library/react"
import {getByLabelText} from "@testing-library/dom";
import {MemoryRouter} from "react-router-dom";
import {TaskForm} from "../components/TaskForm";

describe('initial state setup', ()=> {
    const TestComponent = (props) => {
        return(
            <div>
                <label for="taskListCount">TaskListCount:</label>
                <input id="taskListCount" type="number" value={props.tasks.length}/>
            </div>
        )
    }

    const renderWithContext = (component) => {
        return {
            ...render(
                <TaskListContext>
                    {component}
                </TaskListContext>
            )
        }

    }

    it('sets initial state if there are no tasks in local storage', () => {
        let mockStorage = {}
        global.Storage.prototype.getItem = jest.fn((key) => mockStorage[key])
        const expectedState = {
            nextTaskId: 0,
            tasks: []
        };

        ({getByLabelText} = renderWithContext(<TestComponent/>))

        const taskListCount = getByLabelText('TaskListCount:')
        expect(taskListCount).toHaveValue(0)
    })
})

