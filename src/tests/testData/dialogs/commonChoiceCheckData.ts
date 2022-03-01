module.exports=[
    {
        intent: 'IWantToUpdateMyPersonalInformation',
        initialData: {
            locale: 'en',
            retryCount: 0,
            intents: ["IWantToUpdateMyPersonalInformation", "IHaveQuestionAboutOASPension"],
            maxRetryCount: 4,
            promptCode: 'AlwaysOnBot',
            result: ''
        },
        name: 'Common choice check with Always On Bot Test Data',
        steps: [
            ['hi', 'How can I help?'],
            ['I want to update my personal information', '']
        ]
    },
    {
        intent: 'None',
        initialData: {
            locale: 'en',
            retryCount: 0,
            intents: ["IWantToUpdateMyPersonalInformation", "IHaveQuestionAboutOASPension"],
            maxRetryCount: 4,
            promptCode: 'AlwaysOnBot',
            result: ''
        },
        name: 'Common choice check with Always On Bot Test Data with negative test steps',
        steps: [
            ['hi', 'How can I help?'],
            ['haha', 'Hmm, I\'m not sure what you meant. How can I help?']
        ]
    }
];