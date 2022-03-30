import React from "react";
import MyFirstComponent from "../components/MyFirstComponent";
import {TextBox} from "../stories/TextBox";

const PageOne: React.FC = () => {
    return (
        <>
            <h1>page one header</h1>
            <p>this is my page one text</p>
            <MyFirstComponent/>
            <TextBox placeholder='arg' size='small' />
        </>
    )
}

export default PageOne