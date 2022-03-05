module.exports=[
    {
        intent: 'Test',
        initialData: {
            locale: 'en',
            retryCount: 0,
            intents: ['Yes', 'No'],
            maxRetryCount: 2,
            initialPrompt: 'Great! Your full address is #121  233 Emily Anna  St  Woodbridge  ON L4H3H5. Is that correct?',
            promptCode: 'AddressFound',
            result: ''
        },
        name: 'address found check mock dialog test',
        steps: [
            ['hi', 'Great! Your full address is #121  233 Emily Anna  St  Woodbridge  ON L4H3H5. Is that correct?'],
            ['haha', 'Hmm, I\'m not sure what you meant. Is that correct address?']
        ]
    }
];