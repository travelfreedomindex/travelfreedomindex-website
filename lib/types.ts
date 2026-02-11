export interface PassportRanking {
  country: string;
  country_code: string;
  level1_score: number;
  level1_rank: number;
  pri_score: number;
  pri_rank: number;
  level2_score?: number; // Backward compatibility
  level2_rank?: number;
  reciprocity_details?: ReciprocityDetails;
  // TFI breakdown fields
  total_destinations?: number;
  visa_free?: number;
  visa_on_arrival?: number;
  eta_required?: number;
  visa_required?: number;
}

export interface ReciprocityDetails {
  reciprocal_countries: string[];       // Country codes with mutual visa-free access
  asymmetric_advantages: string[];      // Country codes where passport holder can visit but not vice versa
  asymmetric_penalties: string[];       // Country codes that can visit but passport holder cannot
  mutual_visa_required_countries: string[]; // Country codes where both sides require visas
  counts: {
    reciprocal: number;
    advantages: number;
    penalties: number;
    mutual_visa_required: number;
  };
}

export interface CountryDetail extends PassportRanking {
  visa_free_destinations: string[];
  reciprocity_score: number;
  reciprocal_countries: string[];
  asymmetric_advantages: string[];
  asymmetric_penalties: string[];
}

export type RankingView = 'level1' | 'pri' | 'comparison';

export interface RegionStats {
  region: string;
  avgLevel1: number;
  avgPRI: number;
  countries: number;
}
