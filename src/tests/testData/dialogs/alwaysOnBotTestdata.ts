module.exports=[
    {
        intent: 'IWantToUpdateMyPersonalInformation',
        initialData: {
            locale: 'en',
        },
        name: 'Update Profile Step Dialog',
        steps: [
            ['hi', 'How can I help?'],
            ['I want to update my personal information', 'Ok, here are few more options below.']
        ]
    },
    {
        intent: 'IHaveQuestionAboutOASPension',
        initialData: {
            locale: 'en',
        },
        name: 'Question about OAS Pension Dialog',
        steps: [
            ['hi', 'How can I help?'],
            ['I have a question about my Old Age Security pension', 'Here\'s what I can answer:']
        ]
    },
    {
        intent: 'None',
        initialData: {
            locale: 'en',
        },
        name: 'Choosing None intent',
        steps: [
            ['hi', 'How can I help?'],
            ['gibberish', 'Hmm, I\'m not sure what you meant. How can I help?']
        ]
    }
];