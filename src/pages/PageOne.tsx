import React from "react";
import MyFirstComponent from "../components/MyFirstComponent";

const PageOne: React.FC = () => {
    return (
        <>
            <h1>page one header</h1>
            <p>this is my page one text</p>
            <MyFirstComponent/>
        </>
    )
}

export default PageOne