import React from 'react'

import {Status} from "./Status"

export default {
    title: 'Status',
    component: Status
}

const Template = args => <Status {...args}/>

export const Default = Template.bind({})
Default.args = {
}

export const Outstanding = Template.bind({})
Outstanding.args = {
    completed: false
}

export const Completed = Template.bind({})
Completed.args = {
    completed: true
}
