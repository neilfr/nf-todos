import React from "react";
import MyFirstComponent from "../components/MyFirstComponent";
import {Task} from "../stories/Task";
import {Priority} from "../stories/Priority";

const PageOne: React.FC = () => {
    return (
        <>
            <h1>page one header</h1>
            <p>this is my page one text</p>
            <MyFirstComponent/>
            <Priority priority={9}/>
            <Task
                placeholder='arg'
                description='the description'
                />
        </>
    )
}

export default PageOne