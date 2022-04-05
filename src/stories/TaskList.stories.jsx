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
            placeholder:'placeholder',
            description:'task one',
            priority:2
        },
        {
            status:true,
            placeholder:'another placeholder',
            description:'task two',
            priority:1
        }
    ]
}

export const EmptyTaskList = Template.bind({})
EmptyTaskList.args = {
    tasks: []
}