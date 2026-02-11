'use client';

import { ReciprocityDetails } from '@/lib/types';
import { getFlagEmoji } from '@/lib/data';
import Link from 'next/link';

interface ReciprocitySectionProps {
  reciprocityDetails: ReciprocityDetails;
  countryCode: string;
}

// Country code to name mapping
const COUNTRY_NAMES: Record<string, string> = {
  'IL': 'Israel', 'CY': 'Cyprus', 'KR': 'South Korea', 'CL': 'Chile', 'US': 'United States',
  'SG': 'Singapore', 'JP': 'Japan', 'DE': 'Germany', 'FR': 'France', 'IT': 'Italy',
  'ES': 'Spain', 'GB': 'United Kingdom', 'CA': 'Canada', 'AU': 'Australia', 'NZ': 'New Zealand',
  'SE': 'Sweden', 'NO': 'Norway', 'DK': 'Denmark', 'FI': 'Finland', 'NL': 'Netherlands',
  'BE': 'Belgium', 'AT': 'Austria', 'CH': 'Switzerland', 'IE': 'Ireland', 'PT': 'Portugal',
  'GR': 'Greece', 'CZ': 'Czech Republic', 'PL': 'Poland', 'HU': 'Hungary', 'EE': 'Estonia',
  'LV': 'Latvia', 'LT': 'Lithuania', 'SI': 'Slovenia', 'SK': 'Slovakia', 'MT': 'Malta',
  'LU': 'Luxembourg', 'IS': 'Iceland', 'LI': 'Liechtenstein', 'MC': 'Monaco', 'SM': 'San Marino',
  'VA': 'Vatican City', 'AD': 'Andorra', 'BR': 'Brazil', 'MX': 'Mexico', 'AR': 'Argentina',
  'PE': 'Peru', 'CO': 'Colombia', 'VE': 'Venezuela', 'EC': 'Ecuador', 'BO': 'Bolivia',
  'PY': 'Paraguay', 'UY': 'Uruguay', 'CR': 'Costa Rica', 'PA': 'Panama', 'GT': 'Guatemala',
  'HN': 'Honduras', 'NI': 'Nicaragua', 'SV': 'El Salvador', 'DO': 'Dominican Republic',
  'CU': 'Cuba', 'JM': 'Jamaica', 'TT': 'Trinidad and Tobago', 'BS': 'Bahamas', 'BB': 'Barbados',
  'GY': 'Guyana', 'SR': 'Suriname', 'HT': 'Haiti', 'BZ': 'Belize',
  'CN': 'China', 'IN': 'India', 'ID': 'Indonesia', 'MY': 'Malaysia', 'TH': 'Thailand',
  'PH': 'Philippines', 'VN': 'Vietnam', 'KH': 'Cambodia', 'LA': 'Laos', 'MM': 'Myanmar',
  'BD': 'Bangladesh', 'PK': 'Pakistan', 'LK': 'Sri Lanka', 'NP': 'Nepal', 'BT': 'Bhutan',
  'MV': 'Maldives', 'AE': 'United Arab Emirates', 'SA': 'Saudi Arabia', 'QA': 'Qatar',
  'KW': 'Kuwait', 'BH': 'Bahrain', 'OM': 'Oman', 'JO': 'Jordan', 'LB': 'Lebanon',
  'IQ': 'Iraq', 'IR': 'Iran', 'TR': 'Turkey', 'EG': 'Egypt', 'MA': 'Morocco',
  'TN': 'Tunisia', 'DZ': 'Algeria', 'LY': 'Libya', 'SD': 'Sudan', 'ZA': 'South Africa',
  'NG': 'Nigeria', 'KE': 'Kenya', 'GH': 'Ghana', 'TZ': 'Tanzania', 'UG': 'Uganda',
  'ET': 'Ethiopia', 'ZW': 'Zimbabwe', 'ZM': 'Zambia', 'MW': 'Malawi', 'MZ': 'Mozambique',
  'BW': 'Botswana', 'NA': 'Namibia', 'AO': 'Angola', 'CD': 'DR Congo', 'CG': 'Congo',
  'CM': 'Cameroon', 'CI': "Côte d'Ivoire", 'SN': 'Senegal', 'ML': 'Mali', 'BF': 'Burkina Faso',
  'NE': 'Niger', 'TD': 'Chad', 'CF': 'Central African Republic', 'GA': 'Gabon', 'GQ': 'Equatorial Guinea',
  'RU': 'Russia', 'UA': 'Ukraine', 'BY': 'Belarus', 'KZ': 'Kazakhstan', 'UZ': 'Uzbekistan',
  'TM': 'Turkmenistan', 'KG': 'Kyrgyzstan', 'TJ': 'Tajikistan', 'AM': 'Armenia', 'AZ': 'Azerbaijan',
  'GE': 'Georgia', 'MD': 'Moldova', 'RO': 'Romania', 'BG': 'Bulgaria', 'RS': 'Serbia',
  'HR': 'Croatia', 'BA': 'Bosnia and Herzegovina', 'ME': 'Montenegro', 'MK': 'North Macedonia',
  'AL': 'Albania', 'XK': 'Kosovo', 'AF': 'Afghanistan', 'SY': 'Syria', 'YE': 'Yemen',
  'PS': 'Palestine', 'MU': 'Mauritius', 'SC': 'Seychelles', 'RW': 'Rwanda', 'BI': 'Burundi',
  'DJ': 'Djibouti', 'SO': 'Somalia', 'ER': 'Eritrea', 'SS': 'South Sudan', 'SL': 'Sierra Leone',
  'LR': 'Liberia', 'GN': 'Guinea', 'GW': 'Guinea-Bissau', 'GM': 'Gambia', 'MR': 'Mauritania',
  'TG': 'Togo', 'BJ': 'Benin', 'ST': 'São Tomé and Príncipe', 'CV': 'Cape Verde', 'KM': 'Comoros',
  'MG': 'Madagascar', 'LS': 'Lesotho', 'SZ': 'Eswatini', 'RE': 'Réunion', 'YT': 'Mayotte',
  'BN': 'Brunei', 'TL': 'Timor-Leste', 'MN': 'Mongolia', 'KP': 'North Korea', 'TW': 'Taiwan',
  'HK': 'Hong Kong', 'MO': 'Macau', 'FJ': 'Fiji', 'PG': 'Papua New Guinea', 'SB': 'Solomon Islands',
  'VU': 'Vanuatu', 'NC': 'New Caledonia', 'PF': 'French Polynesia', 'WS': 'Samoa', 'KI': 'Kiribati',
  'TO': 'Tonga', 'FM': 'Micronesia', 'MH': 'Marshall Islands', 'PW': 'Palau', 'NR': 'Nauru',
  'TV': 'Tuvalu', 'AS': 'American Samoa', 'GU': 'Guam', 'MP': 'Northern Mariana Islands',
  'CK': 'Cook Islands', 'NU': 'Niue', 'TK': 'Tokelau', 'WF': 'Wallis and Futuna',
  'PN': 'Pitcairn Islands', 'NF': 'Norfolk Island',
  'PR': 'Puerto Rico', 'VI': 'U.S. Virgin Islands', 'GL': 'Greenland', 'FO': 'Faroe Islands',
  'AX': 'Åland Islands', 'GI': 'Gibraltar', 'JE': 'Jersey', 'GG': 'Guernsey', 'IM': 'Isle of Man',
  'BM': 'Bermuda', 'KY': 'Cayman Islands', 'TC': 'Turks and Caicos', 'VG': 'British Virgin Islands',
  'AG': 'Antigua and Barbuda', 'DM': 'Dominica', 'GD': 'Grenada', 'KN': 'Saint Kitts and Nevis',
  'LC': 'Saint Lucia', 'VC': 'Saint Vincent and the Grenadines', 'AW': 'Aruba', 'CW': 'Curaçao',
  'SX': 'Sint Maarten', 'BQ': 'Caribbean Netherlands', 'MF': 'Saint Martin', 'BL': 'Saint Barthélemy',
  'PM': 'Saint Pierre and Miquelon', 'FK': 'Falkland Islands', 'GS': 'South Georgia', 'SH': 'Saint Helena',
};

function getCountryName(code: string): string {
  return COUNTRY_NAMES[code] || code;
}

interface CountryBadgeProps {
  code: string;
}

function CountryBadge({ code }: CountryBadgeProps) {
  return (
    <Link 
      href={`/country/${code.toLowerCase()}`}
      className="inline-flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg text-sm hover:bg-blue-100 hover:shadow-md transition-all cursor-pointer"
    >
      <span className="text-xl">{getFlagEmoji(code)}</span>
      <span className="text-gray-900">{getCountryName(code)}</span>
    </Link>
  );
}

export function ReciprocitySection({ reciprocityDetails, countryCode }: ReciprocitySectionProps) {
  const { reciprocal_countries, asymmetric_advantages, asymmetric_penalties, mutual_visa_required_countries, counts } = reciprocityDetails;

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-700 mb-1">
            {counts.reciprocal}
          </div>
          <div className="text-sm font-semibold text-green-900 mb-1">
            Reciprocal Relationships
          </div>
          <div className="text-xs text-green-700">
            Mutual visa-free access
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-700 mb-1">
            {counts.advantages}
          </div>
          <div className="text-sm font-semibold text-yellow-900 mb-1">
            Asymmetric Advantages
          </div>
          <div className="text-xs text-yellow-700">
            You can visit, they cannot
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="text-2xl font-bold text-red-700 mb-1">
            {counts.penalties}
          </div>
          <div className="text-sm font-semibold text-red-900 mb-1">
            Asymmetric Penalties
          </div>
          <div className="text-xs text-red-700">
            They can visit, you cannot
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-700 mb-1">
            {counts.mutual_visa_required}
          </div>
          <div className="text-sm font-semibold text-gray-900 mb-1">
            Mutual Visa Required
          </div>
          <div className="text-xs text-gray-700">
            Both sides need visas
          </div>
        </div>
      </div>

      {/* Reciprocal Relationships */}
      <div className="border border-green-200 rounded-lg p-6 bg-green-50">
        <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
          <span className="text-2xl">🤝</span>
          Reciprocal Relationships ({counts.reciprocal})
        </h3>
        <p className="text-sm text-green-800 mb-4">
          Both countries offer visa-free access to each other. These represent balanced, mutually beneficial diplomatic relationships.
        </p>
        {reciprocal_countries.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {reciprocal_countries.map((code) => (
              <CountryBadge key={code} code={code} />
            ))}
          </div>
        ) : (
          <div className="text-sm text-green-700 italic">None</div>
        )}
      </div>

      {/* Asymmetric Advantages */}
      <div className="border border-yellow-200 rounded-lg p-6 bg-yellow-50">
        <h3 className="text-lg font-bold text-yellow-900 mb-3 flex items-center gap-2">
          <span className="text-2xl">✈️</span>
          Asymmetric Advantages ({counts.advantages})
        </h3>
        <p className="text-sm text-yellow-800 mb-4">
          Countries where passport holders can travel visa-free, but those countries' citizens cannot visit reciprocally.
        </p>
        {asymmetric_advantages.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {asymmetric_advantages.map((code) => (
              <CountryBadge key={code} code={code} />
            ))}
          </div>
        ) : (
          <div className="text-sm text-yellow-700 italic">None</div>
        )}
      </div>

      {/* Asymmetric Penalties */}
      <div className="border border-red-200 rounded-lg p-6 bg-red-50">
        <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center gap-2">
          <span className="text-2xl">🚫</span>
          Asymmetric Penalties ({counts.penalties})
        </h3>
        <p className="text-sm text-red-800 mb-4">
          Countries whose citizens can travel to this country visa-free, but passport holders cannot visit them without restrictions.
        </p>
        {asymmetric_penalties.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {asymmetric_penalties.map((code) => (
              <CountryBadge key={code} code={code} />
            ))}
          </div>
        ) : (
          <div className="text-sm text-red-700 italic">None</div>
        )}
      </div>

      {/* Mutual Visa Required */}
      <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="text-2xl">🔒</span>
          Mutual Visa Required ({counts.mutual_visa_required})
        </h3>
        <p className="text-sm text-gray-800 mb-4">
          Countries where both sides require visas for entry. These relationships have no easy access in either direction.
        </p>
        {mutual_visa_required_countries && mutual_visa_required_countries.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {mutual_visa_required_countries.map((code) => (
              <CountryBadge key={code} code={code} />
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-700 italic">None</div>
        )}
      </div>
    </div>
  );
}
