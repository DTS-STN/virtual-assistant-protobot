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
            currentCount: 0
        },
        name: 'Get address Step Dialog with greater 5 address Yes',
        steps: [
            ['hi', 'What\'s your new postal code? (here’s an example: T2T 4M4)'],
            ['T7S 1A1', 'What\'s your new street name?'],
            ['52 Ave','what\'s your new street number?'],
            ['21','What\'s your new apartment or unit number?'],
            ['121','Great! Your full address is #121  21 52  Ave  Whitecourt  AB T7S 1A1. Is that correct?'],
            ['Yes','Perfect! I\'ve updated your address to #121  21 52  Ave  Whitecourt  AB T7S 1A1']
        ]
    }
]