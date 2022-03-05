module.exports = [
  {
    expectedResult: {
      masterError: null,
      preferredEmail: null,
      preferredText: true,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: true,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: true,
      confirmCallbackPhoneNumberStep: true,
      confirmEmailStep: null,
      confirmPhoneStep: true,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        getUserPhoneNumberStep: 0,
        getPreferredCallbackDateAndTimeStep: 0,
        confirmCallbackDetailsStep: 0,
        confirmAuthWordStep: 0,
        getUserEmailStep: 0,
        confirmConfirmationStep: 0,
        getPreferredMethodOfContactStep: 0,
        confirmEmailStep: 0,
        confirmPhoneStep: 0
      }
    },
    expectedStatus: 'complete',
    intent: 'None',
    initialData: {
      masterError: null,
      preferredEmail: null,
      preferredText: true,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: true,
      confirmCallbackPhoneNumberStep: true,
      confirmEmailStep: null,
      confirmPhoneStep: false,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        getUserPhoneNumberStep: 0,
        getPreferredCallbackDateAndTimeStep: 0,
        confirmCallbackDetailsStep: 0,
        confirmAuthWordStep: 0,
        getUserEmailStep: 0,
        confirmConfirmationStep: 0,
        getPreferredMethodOfContactStep: 0,
        confirmEmailStep: 0,
        confirmPhoneStep: 0
      }
    },
    name: 'Initial the getUserPhoneNumber dialog successful',
    steps: [
      [
        null,
        `Can you give me a cell phone number where I can send you the text message?`
      ],
      ['1234567890', `Ok, I'll text your confirmation code to [PHONE NUMBER].`]
    ]
  },
  {
    expectedResult: undefined,
    intent: 'None',
    expectedStatus: 'complete',
    initialData: {
      masterError: null,
      preferredEmail: null,
      preferredText: true,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: true,
      confirmCallbackPhoneNumberStep: true,
      confirmEmailStep: null,
      confirmPhoneStep: false,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        getUserPhoneNumberStep: 0,
        getPreferredCallbackDateAndTimeStep: 0,
        confirmCallbackDetailsStep: 0,
        confirmAuthWordStep: 0,
        getUserEmailStep: 0,
        confirmConfirmationStep: 0,
        getPreferredMethodOfContactStep: 0,
        confirmEmailStep: 0,
        confirmPhoneStep: 0
      }
    },
    name: 'Input wrong format phone number',
    steps: [
      [
        null,
        `Can you give me a cell phone number where I can send you the text message?`
      ],
      [
        'testtest1.com',
        `Oops, looks like the phone number you entered isn’t formatted correctly (here’s an example: 123-456-7890). Let’s try again.`
      ]
    ]
  },

  {
    expectedResult: {
      masterError: null,
      preferredEmail: null,
      preferredText: true,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: true,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: true,
      confirmCallbackPhoneNumberStep: true,
      confirmEmailStep: null,
      confirmPhoneStep: true,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        getUserPhoneNumberStep: 0,
        getPreferredCallbackDateAndTimeStep: 0,
        confirmCallbackDetailsStep: 0,
        confirmAuthWordStep: 0,
        getUserEmailStep: 0,
        confirmConfirmationStep: 0,
        getPreferredMethodOfContactStep: 0,
        confirmEmailStep: 0,
        confirmPhoneStep: 0
      }
    },
    expectedStatus: 'complete',
    intent: 'None',
    initialData: {
      masterError: null,
      preferredEmail: null,
      preferredText: true,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: true,
      confirmCallbackPhoneNumberStep: true,
      confirmEmailStep: null,
      confirmPhoneStep: false,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        getUserPhoneNumberStep: 0,
        getPreferredCallbackDateAndTimeStep: 0,
        confirmCallbackDetailsStep: 0,
        confirmAuthWordStep: 0,
        getUserEmailStep: 0,
        confirmConfirmationStep: 0,
        getPreferredMethodOfContactStep: 0,
        confirmEmailStep: 0,
        confirmPhoneStep: 0
      }
    },
    name: 'Users enter correct phone number',
    steps: [
      [
        null,
        `Can you give me a cell phone number where I can send you the text message?`
      ],
      ['1234567890', `Ok, I'll text your confirmation code to [PHONE NUMBER].`]
    ]
  },
  {
    expectedResult: undefined,
    expectedStatus: 'complete',
    intent: 'None',
    initialData: {
      masterError: null,
      preferredEmail: null,
      preferredText: true,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: true,
      confirmCallbackPhoneNumberStep: true,
      confirmEmailStep: null,
      confirmPhoneStep: false,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        getUserPhoneNumberStep: 0,
        getPreferredCallbackDateAndTimeStep: 0,
        confirmCallbackDetailsStep: 0,
        confirmAuthWordStep: 0,
        getUserEmailStep: 0,
        confirmConfirmationStep: 0,
        getPreferredMethodOfContactStep: 0,
        confirmEmailStep: 0,
        confirmPhoneStep: 0
      }
    },
    name: 'input invalid user phone number once',
    steps: [
      [
        null,
        `Can you give me a cell phone number where I can send you the text message?`
      ],
      [
        'testtest1.com',
        `Oops, looks like the phone number you entered isn’t formatted correctly (here’s an example: 123-456-7890). Let’s try again.`
      ]
    ]
  },
  {
    expectedResult: undefined,
    intent: 'NONE',
    expectedStatus: 'complete',
    initialData: {
      masterError: null,
      preferredEmail: null,
      preferredText: true,
      preferredEmailAndText: null,
      getPreferredCallbackDateAndTimeStep: null,
      getUserPhoneNumberStep: null,
      getUserEmailStep: null,
      confirmAuthWordStep: null,
      confirmConfirmationStep: null,
      getPreferredMethodOfContactStep: true,
      confirmCallbackPhoneNumberStep: true,
      confirmEmailStep: null,
      confirmPhoneStep: false,
      confirmCallbackDetailsStep: null,
      date: '',
      phoneNumber: '',
      time: '',
      authCode: '',
      errorCount: {
        getUserPhoneNumberStep: 0,
        getPreferredCallbackDateAndTimeStep: 0,
        confirmCallbackDetailsStep: 0,
        confirmAuthWordStep: 0,
        getUserEmailStep: 0,
        confirmConfirmationStep: 0,
        getPreferredMethodOfContactStep: 0,
        confirmEmailStep: 0,
        confirmPhoneStep: 0
      }
    },
    name: 'input invalid user phone number more than 2 times',
    steps: [
      [
        null,
        `Can you give me a cell phone number where I can send you the text message?`
      ],
      [
        'testtest1.com',
        `Oops, looks like the phone number you entered isn’t formatted correctly (here’s an example: 123-456-7890). Let’s try again.`
      ],
      [
        `hahaha`,
        `Looks like the phone numbers you've entered aren't the correct format. Please double check your phone number before continuing. Do you want to try again?`
      ]

    ]
  }
];
