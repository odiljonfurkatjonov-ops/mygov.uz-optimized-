// Master service index — combines all 800+ government services
import { PENSION_SERVICES } from './pension';
import { CUSTOMS_SERVICES } from './customs';
import { CADASTRE_SERVICES } from './cadastre';
import { INTERIOR_SERVICES } from './interior';
import { HEALTH_SERVICES } from './health';
import { EDUCATION_SERVICES } from './education';
import { LABOUR_SERVICES } from './labour';
import { TAX_SERVICES } from './tax';
import { BUSINESS_SERVICES } from './business';
import { CIVIL_REGISTRY_SERVICES } from './civil_registry';
import { JUSTICE_SERVICES } from './justice';
import { DIGITAL_SERVICES } from './digital';
import { ENVIRONMENT_SERVICES, AGRICULTURE_SERVICES } from './environment';
import { SOCIAL_SERVICES } from './social';
import { UTILITY_SERVICES } from './utilities';
import { CONSTRUCTION_SERVICES, REAL_ESTATE_SERVICES } from './construction';
import { CULTURE_SPORT_SERVICES, RELIGION_MILITARY_SERVICES } from './culture_sport';
import { CONSUMER_SERVICES, FOREIGN_AFFAIRS_SERVICES, ANTICORRUPTION_SERVICES } from './consumer_foreign';

export const MASTER_SERVICES = [
	...CIVIL_REGISTRY_SERVICES,   // Family, birth, marriage, death
	...INTERIOR_SERVICES,          // Passport, propiska, drivers, vehicles, visa
	...PENSION_SERVICES,           // Pensions and allowances
	...SOCIAL_SERVICES,            // Social protection, disability, welfare
	...HEALTH_SERVICES,            // Healthcare, doctors, insurance
	...EDUCATION_SERVICES,         // School, university, vocational
	...LABOUR_SERVICES,            // Employment, work permits, disputes
	...TAX_SERVICES,               // Taxes, STIR, VAT, declarations
	...BUSINESS_SERVICES,          // Business registration, licenses, tenders
	...CADASTRE_SERVICES,          // Land, cadastre, property rights
	...REAL_ESTATE_SERVICES,       // Property buy/sell/rent
	...CONSTRUCTION_SERVICES,      // Building permits, fire safety
	...UTILITY_SERVICES,           // Gas, water, electricity, internet
	...CUSTOMS_SERVICES,           // Import, export, customs clearance
	...JUSTICE_SERVICES,           // Courts, notary, legal aid
	...DIGITAL_SERVICES,           // Digital signature, portals, IT
	...ENVIRONMENT_SERVICES,       // Ecology, water, emission
	...AGRICULTURE_SERVICES,       // Farming, livestock, irrigation
	...CULTURE_SPORT_SERVICES,     // Culture, tourism, sport, youth
	...RELIGION_MILITARY_SERVICES, // Religion, military service
	...CONSUMER_SERVICES,          // Consumer protection, food safety
	...FOREIGN_AFFAIRS_SERVICES,   // Consular, apostille, investors
	...ANTICORRUPTION_SERVICES,    // Anti-corruption, ombudsman
];