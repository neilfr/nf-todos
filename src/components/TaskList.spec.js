import {TaskList} from "./TaskList";
import {MemoryRouter} from "react-router-dom"
import {TaskListContext} from "../context/TaskListContext";
import React from "react";
import { render } from "@testing-library/react"
import {fireEvent, logRoles, screen} from "@testing-library/dom";
import {TaskListProvider} from "../context/TaskListContext"
import {StageContext} from "../context/StageContext";


describe('TaskList tests', () => {

    const mockTasks = [
        {
            id:1,
            description:'my task',
            priority:5,
            stage_id:1
        },
        {
            id:2,
            description:'my other task',
            priority:7,
            stage_id:2
        }
    ]

    const mockAddNewTask = jest.fn()

    const mockStages = [
        {
            id:1,
            description:'stage one'
        },
        {
            id:2,
            description:'stage two'
        }
    ]

    const renderTaskList = () => {
        return render(
            <MemoryRouter>
                <StageContext.Provider value={{stages:mockStages}}>
                    <TaskListContext.Provider value={{addNewTask:mockAddNewTask, tasks:[]}}>
                        <TaskList/>
                    </TaskListContext.Provider>
                </StageContext.Provider>
            </MemoryRouter>
        );
    };

    it('displays message if there are no tasks', () => {
        renderTaskList()

        const text = screen.getByRole('text')
        expect(text).toBeInTheDocument()
    })

    it('calls the supplied function when the add new task button is clicked', () => {
        renderTaskList()
        const addButton = screen.getByRole('button',{name:'Add'})
        expect(addButton).toBeInTheDocument()

        fireEvent.click(addButton)

        expect(mockAddNewTask).toHaveBeenCalled()
    })

    it('renders stage columns with descriptions', () => {
        renderTaskList()
        const stageColumns = screen.getAllByRole('stage-column')
        expect(stageColumns).toHaveLength(2)

        stageColumns.forEach((column,index) => {
            expect(column).toHaveTextContent(mockStages[index].description)
        })
    })

    it('sorts tasks into columns by stage', () => {
        renderTaskList()
    })


})