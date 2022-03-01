module.exports=[
    {
        intent: 'promptConfirmYes',
        initialData: {
            locale: 'en',
        },
        name: 'Yes Update phone Number',
        steps: [
            ['hi', 'Ok, great! I can help with that. The phone number I have for you is 123-456-7890. Would you like to update to a new phone number?'],
            ['promptConfirmYes', 'Ok, what\'s your new phone number? (here’s an example: 123-456-7890)']
        ]
    },
    {
        intent: 'promptConfirmNo',
        initialData: {
            locale: 'en',
        },
        name: 'No Dont Update Phone Number',
        steps: [
            ['hi', 'Ok, great! I can help with that. The phone number I have for you is 123-456-7890. Would you like to update to a new phone number?'],
            ['promptConfirmNo', 'Ok, no problem!']
        ]
    },
    {
        intent: 'None',
        initialData: {
            locale: 'en',
        },
        name: 'Choosing None intent on Update phoneNUmber',
        steps: [
            ['hi', 'Ok, great! I can help with that. The phone number I have for you is 123-456-7890. Would you like to update to a new phone number?'],
            ['haha', 'Hmm, I\'m not sure what you meant. Would you like to update your phone number?']
        ]
    }
];