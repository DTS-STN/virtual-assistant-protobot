module.exports = [
    {
        intent: 'promptConfirmYes',
        initialData: {
            locale: 'en',
            errorCount: {

                getAddressesStep: 0,
                numberValidationStep: 0,
                updateAddressStep: 0
            },
            masterError: false,
            maxCount: 2,
            currentCount: 0,
            AddressType:'MULTIPLE',
            manyAddresses: null
        },
        name: 'Get address Step Dialog with found 3 choices cant find',
        steps: [
            ['hi', 'What\'s your new postal code? (here’s an example: T2T 4M4)'],
            ['L4H3H5', '', 'I found more than one street for that postal code, Please select your street from the ones provided below.'],
            ['I can\'t see my street address here', 'I\'m sorry that I can\'t help you change your address today. If you\'d like, I can have a Service Canada representative call to help you.']
        ]
    }
]