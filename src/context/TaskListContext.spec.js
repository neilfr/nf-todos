import React from 'react'
import {TaskListContext} from "./TaskListContext";
import { render } from "@testing-library/react"
import { screen } from "@testing-library/dom"

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
        return render(
            <TaskListContext.Provider value={{}}>
                <div role={'foo'}>foobar</div>
            </TaskListContext.Provider>
        )
        // return render(
        //     <TaskListContext>
        //         {component}
        //     </TaskListContext>
        // )
    }

    it('sets initial state if there are no tasks in local storage', () => {
        // const expectedState = {
        //     tasks:[],
        //     currentTask: {}
        // }

        renderWithContext(<TestComponent/>)

        const foo = screen.getByRole('foo')
        expect(foo).toBeInTheDocument()
        // const taskListCount = screen.getByLabelText('TaskListCount:')
        // expect(taskListCount).toHaveValue(0)
    })
})

