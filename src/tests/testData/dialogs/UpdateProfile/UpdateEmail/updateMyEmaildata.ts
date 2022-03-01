module.exports=[
    {
        intent: 'promptConfirmYes',
        initialData: {
            locale: 'en',
        },
        name: 'Yes Update email address',
        steps: [
            ['hi', 'Ok, great! I can help with that. The email address I have for you is test@test.ca. Do you want to update to a new email address?'],
            ['Yes', 'Ok, what\'s your new email address? (here’s an example: name@mail.com)']
        ]
    },
    {
        intent: 'promptConfirmNo',
        initialData: {
            locale: 'en',
        },
        name: 'No Dont Update email address',
        steps: [
            ['hi', 'Ok, great! I can help with that. The email address I have for you is test@test.ca. Do you want to update to a new email address?'],
            ['No', 'Ok, no problem!']
        ]
    },
    {
        intent: 'None',
        initialData: {
            locale: 'en',
        },
        name: 'Choosing None intent on Update Email',
        steps: [
            ['hi', 'Ok, great! I can help with that. The email address I have for you is test@test.ca. Do you want to update to a new email address?'],
            ['haha', 'Hmm, I\'m not sure what you meant. Do you want to update this email address?']
        ]
    }
];