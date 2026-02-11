import type { PassportRanking } from './types';

// Client-side data fetching
export async function getAllRankings(): Promise<PassportRanking[]> {
  const res = await fetch('/api/rankings');
  if (!res.ok) throw new Error('Failed to fetch rankings');
  return res.json();
}

export async function getCountryByCode(code: string): Promise<PassportRanking | null> {
  const rankings = await getAllRankings();
  return rankings.find(r => r.country_code.toLowerCase() === code.toLowerCase()) || null;
}

export async function getTopCountries(limit: number = 10, metric: 'level1' | 'pri' = 'pri'): Promise<PassportRanking[]> {
  const rankings = await getAllRankings();
  const sortKey = metric === 'level1' ? 'level1_rank' : 'pri_rank';
  return rankings
    .filter(r => r[sortKey] > 0)
    .sort((a, b) => a[sortKey] - b[sortKey])
    .slice(0, limit);
}

export async function searchCountries(query: string): Promise<PassportRanking[]> {
  const rankings = await getAllRankings();
  const lowerQuery = query.toLowerCase();
  return rankings.filter(r => 
    r.country.toLowerCase().includes(lowerQuery) ||
    r.country_code.toLowerCase().includes(lowerQuery)
  );
}

export function formatScore(score: number): string {
  return score.toFixed(2);
}

export function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export const COUNTRY_REGIONS: Record<string, string[]> = {
  'Europe': ['GB', 'FR', 'DE', 'ES', 'IT', 'NL', 'BE', 'CH', 'AT', 'SE', 'NO', 'DK', 'FI', 'IE', 'PT', 'PL', 'CZ', 'HU', 'GR', 'RO', 'BG',
             'HR', 'SI', 'SK', 'EE', 'LV', 'LT', 'CY', 'MT', 'LU', 'IS', 'LI', 'MC', 'SM', 'VA', 'AD', 'ME', 'RS', 'BA', 'MK', 'AL', 'XK',
             'MD', 'BY', 'UA', 'RU', 'GE', 'AM', 'AZ', 'FO', 'GI', 'JE', 'GG', 'IM', 'AX'],
  'Asia': ['JP', 'KR', 'CN', 'IN', 'SG', 'MY', 'TH', 'ID', 'PH', 'VN', 'KH', 'LA', 'MM', 'BN', 'TL', 'BD', 'LK', 'NP', 'BT', 'MV', 'PK', 'AF',
           'HK', 'MO', 'TW', 'MN', 'KP', 'KZ', 'UZ', 'TM', 'KG', 'TJ'],
  'Americas': ['US', 'CA', 'MX', 'BR', 'AR', 'CL', 'CO', 'PE', 'VE', 'EC', 'BO', 'PY', 'UY', 'CR', 'PA', 'GT', 'HN', 'SV', 'NI', 'DO', 'CU',
               'JM', 'TT', 'BS', 'BB', 'BZ', 'GY', 'SR', 'GF', 'FK', 'GS', 'PR', 'VI', 'BM', 'KY', 'TC', 'VG', 'AI', 'MS',
               'AG', 'DM', 'GD', 'KN', 'LC', 'VC', 'AW', 'CW', 'SX', 'BQ', 'MF', 'BL', 'PM', 'GL', 'HT'],
  'Middle East': ['AE', 'SA', 'IL', 'QA', 'KW', 'BH', 'OM', 'JO', 'LB', 'IQ', 'SY', 'YE', 'PS', 'TR', 'IR'],
  'Africa': ['ZA', 'EG', 'NG', 'KE', 'MA', 'TN', 'DZ', 'LY', 'SD', 'SS', 'ET', 'GH', 'TZ', 'UG', 'MZ', 'ZW', 'ZM', 'MW', 'BW', 'NA',
             'AO', 'CD', 'CG', 'CM', 'CI', 'SN', 'ML', 'BF', 'NE', 'TD', 'CF', 'GA', 'GQ', 'RW', 'BI', 'DJ', 'SO', 'ER',
             'SL', 'LR', 'GN', 'GW', 'GM', 'MR', 'TG', 'BJ', 'ST', 'CV', 'KM', 'MG', 'MU', 'SC', 'LS', 'SZ', 'RE', 'YT', 'SH'],
  'Oceania': ['AU', 'NZ', 'FJ', 'PG', 'NC', 'PF', 'SB', 'VU', 'WS', 'KI', 'TO', 'FM', 'MH', 'PW', 'NR', 'TV',
              'GU', 'AS', 'MP', 'CK', 'NU', 'TK', 'WF', 'PN', 'NF']
};

export function getRegion(countryCode: string): string {
  for (const [region, codes] of Object.entries(COUNTRY_REGIONS)) {
    if (codes.includes(countryCode.toUpperCase())) {
      return region;
    }
  }
  return 'Other';
}
