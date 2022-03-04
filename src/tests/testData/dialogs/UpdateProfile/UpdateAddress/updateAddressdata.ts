module.exports=[
    {
        intent: 'promptConfirmYes',
        initialData: {
            locale: 'en',
            errorCount :{
                getAddressesStep: 0,
                updateAddressStep: -1
              }
        },
        name: 'Update Address Step Yes Dialog',
        steps: [
            ['hi', 'Ok, great! I can help with that. The address I have for you is 123 Fake Street, Markham, ON, C1C 1C1. Would you like to update to a new address?'],
            ['promptConfirmYes', 'What\'s your new postal code? (here’s an example: T2T 4M4)']
        ]
    },
    {
        intent: 'promptConfirmNo',
        initialData: {
            locale: 'en',
            errorCount :{
                getAddressesStep: 0,
                updateAddressStep: -1
              }
        },
        name: 'Update address no step',
        steps: [
            ['hi', 'Ok, great! I can help with that. The address I have for you is 123 Fake Street, Markham, ON, C1C 1C1. Would you like to update to a new address?'],
            ['promptConfirmNo', 'Ok, no problem!']
        ]
    },
    {
        intent: 'None',
        initialData: {
            locale: 'en',
            errorCount :{
                getAddressesStep: 0,
                updateAddressStep: -1
              }
        },
        name: 'Choosing None intent on Update Address Dialog',
        steps: [
            ['hi', 'Ok, great! I can help with that. The address I have for you is 123 Fake Street, Markham, ON, C1C 1C1. Would you like to update to a new address?'],
            ['haha', 'Hmm, I\'m not sure what you meant. Would you like to change your address?']
        ]
    }
];