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
        'nc:AddressPostalCode': 'X0E 1W0',
        'nc:CountryCode': 'CAN',
        'nc:LanguageName': 'en-CA',
        'wsaddr:ReturnAddressLineText': 'false'
    },
    'wsaddr:SearchResults': {
        'wsaddr:Information': {
            'wsaddr:StatusCode': 'RecordsFound',
            'nc:MessageText': '2'
        },
        'wsaddr:AddressMatches': [
            {
                'nc:AddressCategoryText': 'RuralLockBox',
                'wsaddr:DirectoryAreaName': 'TSIIGEHTCHIC',
                'nc:AddressCityName': 'TSIIGEHTCHIC',
                'can:ProvinceCode': 'NT',
                'nc:CountryCode': null,
                'nc:AddressPostalCode': 'X0E1W0',
                'wsaddr:StreetAddressSequence': null,
                'can:StreetDirectionalCode': null,
                'nc:StreetName': null,
                'wsaddr:StreetNumberMinimumText': null,
                'wsaddr:StreetNumberMaximumText': null,
                'wsaddr:StreetNumberSuffixMinimumText': null,
                'wsaddr:StreetNumberSuffixMaximumText': null,
                'can:StreetCategoryCode': null,
                'wsaddr:SuiteNumberMinimumText': null,
                'wsaddr:SuiteNumberMaximumText': null,
                'nc:AddressFullText': null,
                'wsaddr:LockBoxNumberMinimumText': '1',
                'wsaddr:LockBoxNumberMaximumText': '69',
                'wsaddr:DeliveryInstallationAreaName': 'TSIIGEHTCHIC',
                'wsaddr:DeliveryInstallationDescription': 'PO',
                'wsaddr:DeliveryInstallationQualifierName': null,
                'wsaddr:RouteServiceCategory': null,
                'wsaddr:RouteServiceNumber': null,
                'wsaddr:RuralRouteServiceCategory': null,
                'wsaddr:RuralRouteServiceNumber': null
            },
            {
                'nc:AddressCategoryText': 'RuralGeneralDelivery',
                'wsaddr:DirectoryAreaName': 'TSIIGEHTCHIC',
                'nc:AddressCityName': 'TSIIGEHTCHIC',
                'can:ProvinceCode': 'NT',
                'nc:CountryCode': null,
                'nc:AddressPostalCode': 'X0E1W0',
                'wsaddr:StreetAddressSequence': null,
                'can:StreetDirectionalCode': null,
                'nc:StreetName': null,
                'wsaddr:StreetNumberMinimumText': null,
                'wsaddr:StreetNumberMaximumText': null,
                'wsaddr:StreetNumberSuffixMinimumText': null,
                'wsaddr:StreetNumberSuffixMaximumText': null,
                'can:StreetCategoryCode': null,
                'wsaddr:SuiteNumberMinimumText': null,
                'wsaddr:SuiteNumberMaximumText': null,
                'nc:AddressFullText': null,
                'wsaddr:LockBoxNumberMinimumText': null,
                'wsaddr:LockBoxNumberMaximumText': null,
                'wsaddr:DeliveryInstallationAreaName': 'TSIIGEHTCHIC',
                'wsaddr:DeliveryInstallationDescription': 'PO',
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
        'stat:LogEndDateTime': '2022-02-19T18:57:27Z',
        'stat:LogStartDateTime': '2022-02-19T18:57:27Z'
    }
};