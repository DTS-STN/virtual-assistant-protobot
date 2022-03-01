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
            numberValidationStep:null,
            AddressType:'PO BOX',
            UnitNumber:null,
            updateAddressStep:null,            
            currentCount:0,
            currentStep:''
        },
        name: 'Get address Step Dialog with postal box',
        steps: [
            ['hi', 'What\'s your new postal code? (here’s an example: T2T 4M4)'],
            ['X0E 1W0', 'Ok great, what\'s your new post office box number?'],
            ['123','Great! Your full address is #PO BOX 123    Tsiigehtchic  NT X0E 1W0. Is that correct?'],
            ['Yes','Perfect! I\'ve updated your address to #PO BOX 123    Tsiigehtchic  NT X0E 1W0']
        ]
    },
]