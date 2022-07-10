import React from 'react'

export const StatusColumn = ({children}) => {
    return (
        <div className={'border rounded w-full mx-4 text-center'}>
            {children}
        </div>
    )
}