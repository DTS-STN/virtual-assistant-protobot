module.exports =
{
    '@context': {
        'nc': 'http://release.niem.gov/niem/niem-core/5.0/',
        'stat': 'http://release.niem.gov/niem/auxiliary/statistics/5.0/',
        'can': 'http://release.niem.gov/niem/codes/canada_post/5.0/',
        'wsaddr': 'http://interoperability.gc.ca/address/ws-address-facade/1.0/',
        'fault': 'http://interoperability.gc.ca/fault/2.1/'
    },
    'wsaddr:SearchRequest': {
        'nc:AddressFullText': null,
        'nc:AddressCityName': null,
        'can:ProvinceCode': null,
        'nc:AddressPostalCode': 'T2T 4M4',
        'nc:CountryCode': 'CAN',
        'nc:LanguageName': 'en-CA',
        'wsaddr:ReturnAddressLineText': 'false'
    },
    'wsaddr:SearchResults': {
        'wsaddr:Information': {
            'wsaddr:StatusCode': 'RecordsFound',
            'nc:MessageText': '1'
        },
        'wsaddr:AddressMatches': [
            {
                'nc:AddressCategoryText': 'UrbanAddress',
                'wsaddr:DirectoryAreaName': 'CALGARY',
                'nc:AddressCityName': 'CALGARY',
                'can:ProvinceCode': 'AB',
                'nc:CountryCode': null,
                'nc:AddressPostalCode': 'T2T4M4',
                'wsaddr:StreetAddressSequence': 'Even',
                'can:StreetDirectionalCode': 'SW',
                'nc:StreetName': '17',
                'wsaddr:StreetNumberMinimumText': '2104',
                'wsaddr:StreetNumberMaximumText': '2144',
                'wsaddr:StreetNumberSuffixMinimumText': null,
                'wsaddr:StreetNumberSuffixMaximumText': null,
                'can:StreetCategoryCode': 'ST',
                'wsaddr:SuiteNumberMinimumText': null,
                'wsaddr:SuiteNumberMaximumText': null,
                'nc:AddressFullText': null,
                'wsaddr:LockBoxNumberMinimumText': null,
                'wsaddr:LockBoxNumberMaximumText': null,
                'wsaddr:DeliveryInstallationAreaName': null,
                'wsaddr:DeliveryInstallationDescription': null,
                'wsaddr:DeliveryInstallationQualifierName': null,
                'wsaddr:RouteServiceCategory': null,
                'wsaddr:RouteServiceNumber': null,
                'wsaddr:RuralRouteServiceCategory': null,
                'wsaddr:RuralRouteServiceNumber': null
            }
        ]
    },
    'wsaddr:Messages': {
        'wsaddr:MessageErrors': [],
        'wsaddr:MessageWarnings': [],
        'wsaddr:MessageInformation': []
    },
    'wsaddr:Statistics': {
        'stat:LogEndDateTime': '2022-02-19T18:21:10Z',
        'stat:LogStartDateTime': '2022-02-19T18:21:10Z'
    }
};