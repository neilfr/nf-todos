import React from 'react'

export const StageColumn = ({children}) => {
    return (
        <div className={'border rounded w-full mx-4 text-center'}>
            {children}
        </div>
    )
}