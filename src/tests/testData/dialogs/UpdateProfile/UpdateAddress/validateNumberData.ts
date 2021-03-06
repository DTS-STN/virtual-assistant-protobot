module.exports = [
    {
        intent: 'Test',
        initialData: {
            locale: 'en',
            errorCount: {

                getAddressesStep: 0,
                numberValidationStep: 0,
                updateAddressStep: 0
            },

            AddressType: 'MULTIPLE',
            currentCount: 0,
            currentStep: 'street number',

            promptMessage: 'What\'s your new street number?'
        },
        name: 'Validate Number Step proper Number',
        steps: [
            ['52 Ave', 'What\'s your new street number?'],
            ['123',null]
        ]
    },{
        intent: 'Test',
        initialData: {
            locale: 'en',
            errorCount: {

                getAddressesStep: 0,
                numberValidationStep: 1,
                updateAddressStep: 0
            },

            AddressType: 'MULTIPLE',
            currentCount: 0,
            currentStep: 'street number',
            promptMessage: 'What\'s your new street number?',
            promptRetryMessage:'Hmm, I\'m not sure what you meant. Please enter your new street number.'
        },
        name: 'Validate Number Step Improper Number',
        steps: [
            ['haha', 'Hmm, I\'m not sure what you meant. Please enter your new street number.'],
            ['123', null]
        ]
    }
];