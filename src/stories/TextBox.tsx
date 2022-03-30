import React, {FC} from 'react'

export type TextBoxProps = {
    placeholder:string,
    size:string
}

export const TextBox:FC<TextBoxProps> = ({
    placeholder='test placeholder',
    size='large'
                                         }) => {
    const smallStyle = {
        height: '1.5rem',
        background: 'red'
    }
    const largeStyle = {
        height: '3rem',
        'font-size': '3rem'
    }
    switch (size) {
        case 'small':
            // @ts-ignore
            return (
                <div>
                    <p>small</p>
                    <input type='text' placeholder={placeholder} style={smallStyle}/>
                </div>
            )
        break
        case 'large':
            return (
                <div>
                    <p>large</p>
                    <input type='text' placeholder={placeholder} style={largeStyle}/>
                </div>
            )
        default:
            return (
                <div>
                    <p>default</p>
                    <input type='text' placeholder={placeholder}/>
                </div>
            )
    }
}


