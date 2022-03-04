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

            getAddressesStep:null,
            manyAddresses:null,
            masterError:false,
            maxCount:2,
            numberValidationStep:null
        },
        name: 'Get address Step Dialog with eaxact postal code',
        steps: [
            ['hi', 'What\'s your new postal code? (here’s an example: T2T 4M4)'],
            ['T2T 4M4', 'Ok great, What\'s your new street number? (For example, 36 if your address is 36 Maple Avenue)'],
            ['36','Great! Your full address is #36  17 St Calgary  AB T2T 4M4. Is that correct?'],
            ['Yes','Perfect! I\'ve updated your address to #36  17 St Calgary  AB T2T 4M4']
        ]
    }
]