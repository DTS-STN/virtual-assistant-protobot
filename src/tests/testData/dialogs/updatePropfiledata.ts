module.exports=[
    {
        intent: 'UpdateMyAddress',
        initialData: {
            locale: 'en'
        },
        name: 'Update Address Step Dialog',
        steps: [
            ['hi', 'Ok, here are few more options below.'],
            ['Update My address', 'Ok, great! I can help with that. The address I have for you is 123 Fake Street, Markham, ON, C1C 1C1. Would you like to update to a new address?']
        ]
    },
    {
        intent: 'UpdateMyPhoneNumber',
        initialData: {
            locale: 'en'
        },
        name: 'Update My Phone Number step Dialog',
        steps: [
            ['hi', 'Ok, here are few more options below.'],
            ['Update My Phone Number', 'Ok, great! I can help with that. The phone number I have for you is 123-654-0987. Would you like to update to a new phone number?']
        ]
    },
    {
        intent: 'UpdateMyEmail',
        initialData: {
            locale: 'en'
        },
        name: 'Choosing Update My Email Step Dialog',
        steps: [
            ['hi', 'Ok, here are few more options below.'],
            ['Update My Email Address', 'Ok, great! I can help with that. The email address I have for you is test@test.ca. Do you want to update to a new email address?']
        ]
    },
    {
        intent: 'None',
        initialData: {
            locale: 'en'
        },
        name: 'Choosing None intent on Update profile',
        steps: [
            ['hi', 'Ok, here are few more options below.'],
            ['bananas', 'Hmm, I\'m not sure what you meant. What do you want to update today?']
        ]
    }
];