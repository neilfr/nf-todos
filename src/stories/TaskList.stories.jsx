import React from 'react'

import {TaskList} from "./TaskList"

export default {
    title: 'My tasklist',
    component: TaskList
}

const Template = args => <TaskList {...args} />

export const Default = Template.bind({})

Default.args = {
    tasks: [
        {
            status:false,
            description:'task a',
            priority:2
        },
        {
            status:false,
            description:'task c',
            priority:1
        },
        {
            status:false,
            description:'task b',
            priority:3
        }
    ]
}

export const EmptyTaskList = Template.bind({})
EmptyTaskList.args = {
    tasks: []
}