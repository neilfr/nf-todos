import React from 'react'

export const StageColumn = (props) => {
    return (
        <div role={"stage-column"} className={'block w-full'}>
            <h2 className={'text-center'}>{props.title}</h2>
            <div className={'w-full mx-4 text-center'}>
                {props.children}
            </div>
        </div>
    )
}