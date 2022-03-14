module.exports=[
    {
        intent:'promptConfirmYes',
        initialData: {
            locale: 'en'
        },
        name: 'continue and feedback step yes want to update',
        steps: [
            ['hi', 'Is there anything else I can help you with today?'],
            ['Yes','How can I help?'],
            ['hahah', 'Hmm, I\'m not sure what you meant. How can I help?']
        ]
    },
    {
        intent:'promptConfirmNo',
        initialData: {
            locale: 'en'
        },
        name: 'continue and feedback step no go to feedback',
        steps: [
            ['hi', 'Is there anything else I can help you with today?'],
            ['No','Before you go, could I ask you to rate the service you received today?\n\n   1. 1=😡\n   2. 2=😕\n   3. 3=😐\n   4. 4=🙂\n   5. 5=😀']
        ]
    }
];