import {TaskList} from "./TaskList";
import {TaskListProvider} from "../context/TaskListContext";
import React from "react";
import { render } from "@testing-library/react"

describe('TaskList tests', () => {
    it('displays message if there are no tasks', () => {

        const renderTaskList = () => {
            return render(
                <TaskListProvider>
                    <TaskList/>
                </TaskListProvider>
            );
        };

        const expectedMessage = "Please add a first task"

        const {getByText} = renderTaskList()
        expect(getByText(expectedMessage)).toBeInTheDocument()
    })
})