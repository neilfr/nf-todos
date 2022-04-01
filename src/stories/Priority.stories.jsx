import React from 'react'

import { Priority } from "./Priority"

export default {
    title: 'My Priority',
    component: Priority
}

const Template = args => <Priority {...args}/>

export const Default = Template.bind({})
Default.args = {
    priority:1
}

export const BiggerNumber = Template.bind({})
BiggerNumber.args = {
    priority:99
}