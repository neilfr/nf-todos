import React from 'react'

import {TaskList, SORT_OPTIONS} from "./TaskList"

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

export const SortByDescription = Template.bind({})
SortByDescription.args = {
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
    ],
    sortByProperty: SORT_OPTIONS.SORT_BY_DESCRIPTION
}

export const SortByPriority = Template.bind({})
SortByPriority.args = {
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
    ],
    sortByProperty: SORT_OPTIONS.SORT_BY_PRIORITY
}