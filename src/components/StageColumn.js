import React from 'react'

export const StageColumn = (props) => {
    return (
        <div className={'block'}>
            <h2 className={'text-center'}>{props.title}</h2>
            <div className={'border rounded w-full mx-4 text-center'}>
                {props.children}
            </div>
        </div>
    )
}