import React from "react";
import MyFirstComponent from "../components/MyFirstComponent";
import {Priority} from "../stories/Priority";
import {TaskList} from "../stories/TaskList";

const PageOne = () => {
    const tasks = [
        {
            status:false,
            placeholder:'placeholder',
            description:'task one',
            priority:2
        },
        {
            status:true,
            placeholder:'another placeholder',
            description:'task two',
            priority:1
        }
    ]

    return (
        <>
            <h1>page one header</h1>
            <p>this is my page one text</p>
            <MyFirstComponent/>
            <Priority priority={9}/>
            <TaskList tasks={tasks}/>
        </>
    )
}

export default PageOne