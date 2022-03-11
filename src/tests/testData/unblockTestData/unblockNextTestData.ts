module.exports = [
    {
      expectedResult: undefined,
      expectedStatus: 'complete',
      intent: 'NoNeed',
      initialData: {
        masterError: null,
        confirmLookIntoStep: false,
        unblockDirectDeposit: false,
        directDepositMasterError:null,
        nextOptionStep: null,
        errorCount: {
          nextOptionStep: 0,
          confirmLookIntoStep: 0,
          unblockDirectDeposit: 0,
          directDepositErrorStep:0
        }
      },
      name: 'Initial Direct Deposit Dialog successful',
      steps: [

        [
          `What is your 5-digit bank transit number?`,
          `12345`
        ],
        [
          'Yes, please!',
          'Ok, is [XXX-XXX-XXXX] still the best phone number to reach you?'
        ]
      ]
    }
  ]
