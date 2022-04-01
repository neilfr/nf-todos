import React from 'react'

import { Task } from "./Task"

export default {
    title: 'My TextBox',
    component: Task
}

const Template = args => <Task {...args} />

export const Default = Template.bind({})
Default.args = {
}

export const Small = Template.bind({})
Small.args = {...Default.args,
    description: 'this is small task',
    priority: 2
}

export const Large = Template.bind({})
Large.args = {...Default.args,
    description: 'this is a large task',
    priority: 8
}
