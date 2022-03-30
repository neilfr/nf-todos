import React from 'react'

import { TextBox } from "./TextBox";

export default {
    title: 'My TextBox',
    component: TextBox
}

export const Small = () => <TextBox placeholder='foobar' size='small'/>
export const Large = () => <TextBox placeholder='foobar' size='large'/>
export const Default = () => <TextBox placeholder='foobar' size='foo'/>
