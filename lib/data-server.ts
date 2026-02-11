import 'server-only';
import type { PassportRanking } from './types';
import { readFile } from 'fs/promises';
import { join } from 'path';

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

export async function getAllRankingsServer(): Promise<PassportRanking[]> {
  const filePath = join(process.cwd(), 'public', 'data', 'rankings.json');
  const fileContent = await readFile(filePath, 'utf-8');
  const data = JSON.parse(fileContent);
  
  // Get both Level 1 (TFI) and Level 2 (PRI/RATFI) rankings
  const level1Rankings = data.rankings || [];
  const priRankings = data.pri_rankings || data.level2_rankings || [];
  
  // Create lookup map for PRI scores
  const priMap = new Map<string, { score: number; rank: number }>(
    priRankings.map((item: any) => [
      item.passport,
      { 
        score: item.pri_score || item.level2_score || 0, 
        rank: item.pri_rank || item.level2_rank || 0 
      }
    ])
  );
  
  // Merge Level 1 and PRI data
  return level1Rankings.map((item: any) => {
    const priData = priMap.get(item.passport) || { score: 0, rank: 0 };
    const priRanking = priRankings.find((r: any) => r.passport === item.passport);
    
    return {
      country: COUNTRY_NAMES[item.passport] || item.passport,
      country_code: item.passport,
      level1_score: item.total_score || 0,
      level1_rank: item.rank || 0,
      pri_score: priData.score,
      pri_rank: priData.rank,
      reciprocity_details: priRanking?.reciprocity_details || undefined,
      // TFI breakdown fields from Level 1 data
      total_destinations: item.total_destinations || 0,
      visa_free: item.breakdown?.visa_free || priRanking?.visa_free || 0,
      visa_on_arrival: item.breakdown?.visa_on_arrival || priRanking?.visa_on_arrival || 0,
      eta_required: item.breakdown?.eta_required || priRanking?.eta_required || 0,
      visa_required: item.breakdown?.visa_required || priRanking?.visa_required || 0,
    };
  });
}

export async function getCountryByCodeServer(code: string): Promise<PassportRanking | null> {
  const rankings = await getAllRankingsServer();
  return rankings.find(r => r.country_code.toLowerCase() === code.toLowerCase()) || null;
}

export async function getTopCountriesServer(limit: number = 10, metric: 'level1' | 'pri' = 'pri'): Promise<PassportRanking[]> {
  const rankings = await getAllRankingsServer();
  const sortKey = metric === 'level1' ? 'level1_rank' : 'pri_rank';
  return rankings
    .filter(r => r[sortKey] > 0)
    .sort((a, b) => a[sortKey] - b[sortKey])
    .slice(0, limit);
}
