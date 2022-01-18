module.exports = [
  {
    expectedResult: {
      destination: 'Seattle',
      origin: 'New York',
      travelDate: 'ddd'
    },
    expectedStatus: 'complete',
    initialData: {
      masterError: null,
      confirmCallbackStep: true,
      confirmCallbackPhoneNumberStep: null,
      preferredEmail: null,
      preferredText: null,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: null,
      confirmEmailStep: null,
      confirmPhoneStep: null,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        confirmCallbackStep: 0,
        getUserPhoneNumberStep: 0,
        getPreferredCallbackDateAndTimeStep: 0,
        confirmCallbackPhoneNumberStep: 0,
        confirmCallbackDetailsStep: 0,
        confirmAuthWordStep: 0,
        getUserEmailStep: 0,
        confirmConfirmationStep: 0,
        getPreferredMethodOfContactStep: 0,
        confirmEmailStep: 0,
        confirmPhoneStep: 0
      }
    },
    name: 'Full flow',
    steps: [
      ['hi', 'To what city would you like to travel?'],
      ['Seattle', 'From what city will you be travelling?'],
      ['New York', 'On what date would you like to travel?'],
      [
        'tomorrow',
        `Please confirm, I have you traveling to: Seattle from: New York on: ${'ffff'}. Is this correct? (1) Yes or (2) No`
      ],
      ['yes', null]
    ]
  },
  {
    expectedResult: undefined,
    expectedStatus: 'complete',
    initialData: {},
    name: 'Full flow with \'no\' at confirmation',
    steps: [
      ['hi', 'To what city would you like to travel?'],
      ['Seattle', 'From what city will you be travelling?'],
      ['New York', 'On what date would you like to travel?'],
      [
        'tomorrow',
        `Please confirm, I have you traveling to: Seattle from: New York on: ${'dd'}. Is this correct? (1) Yes or (2) No`
      ],
      ['no', null]
    ]
  },
  {
    expectedResult: {
      destination: 'Bahamas',
      origin: 'New York',
      travelDate: 'ddd'
    },
    expectedStatus: 'complete',
    initialData: {
      destination: 'Bahamas'
    },
    name: 'Destination given',
    steps: [
      ['hi', 'From what city will you be travelling?'],
      ['New York', 'On what date would you like to travel?'],
      [
        'tomorrow',
        `Please confirm, I have you traveling to: Bahamas from: New York on: ${'ddd'}. Is this correct? (1) Yes or (2) No`
      ],
      ['yes', null]
    ]
  },
  {
    expectedResult: {
      destination: 'Seattle',
      origin: 'New York',
      travelDate: 'ddd'
    },
    expectedStatus: 'complete',
    initialData: {
      destination: 'Seattle',
      origin: 'New York'
    },
    name: 'Destination and origin given',
    steps: [
      ['hi', 'On what date would you like to travel?'],
      [
        'tomorrow',
        `Please confirm, I have you traveling to: Seattle from: New York on: ${'ddd'}. Is this correct? (1) Yes or (2) No`
      ],
      ['yes', null]
    ]
  },
  {
    expectedResult: {
      destination: 'Seattle',
      origin: 'Bahamas',
      travelDate: 'ddd'
    },
    expectedStatus: 'complete',
    initialData: {
      destination: 'Seattle',
      origin: 'Bahamas',
      travelDate: 'ddd'
    },
    name: 'All booking details given for today',
    steps: [
      [
        'hi',
        `Please confirm, I have you traveling to: Seattle from: Bahamas on: ${'ddd'}. Is this correct? (1) Yes or (2) No`
      ],
      ['yes', null]
    ]
  },
  {
    expectedResult: undefined,
    expectedStatus: 'complete',
    initialData: {},
    name: 'Cancel on origin prompt',
    steps: [
      ['hi', 'To what city would you like to travel?'],
      ['cancel', 'Cancelling...']
    ]
  },
  {
    expectedResult: undefined,
    expectedStatus: 'complete',
    initialData: {},
    name: 'Cancel on destination prompt',
    steps: [
      ['hi', 'To what city would you like to travel?'],
      ['Seattle', 'From what city will you be travelling?'],
      ['cancel', 'Cancelling...']
    ]
  },
  {
    expectedResult: undefined,
    expectedStatus: 'complete',
    initialData: {},
    name: 'Cancel on date prompt',
    steps: [
      ['hi', 'To what city would you like to travel?'],
      ['Seattle', 'From what city will you be travelling?'],
      ['New York', 'On what date would you like to travel?'],
      ['cancel', 'Cancelling...']
    ]
  },
  {
    expectedResult: undefined,
    expectedStatus: 'complete',
    initialData: {},
    name: 'Cancel on confirm prompt',
    steps: [
      ['hi', 'To what city would you like to travel?'],
      ['Seattle', 'From what city will you be travelling?'],
      ['New York', 'On what date would you like to travel?'],
      [
        'tomorrow',
        `Please confirm, I have you traveling to: Seattle from: New York on: ${'bookingDialogTomorrow'}. Is this correct? (1) Yes or (2) No`
      ],
      ['cancel', 'Cancelling...']
    ]
  }
];
