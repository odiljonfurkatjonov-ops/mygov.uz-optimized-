// Master service index — combines all 800+ government services
import { PENSION_SERVICES } from './pension.js';
import { CUSTOMS_SERVICES } from './customs.js';
import { CADASTRE_SERVICES } from './cadastre.js';
import { INTERIOR_SERVICES } from './interior.js';
import { HEALTH_SERVICES } from './health.js';
import { EDUCATION_SERVICES } from './education.js';
import { LABOUR_SERVICES } from './labour.js';
import { TAX_SERVICES } from './tax.js';
import { BUSINESS_SERVICES } from './business.js';
import { CIVIL_REGISTRY_SERVICES } from './civil_registry.js';
import { JUSTICE_SERVICES } from './justice.js';
import { DIGITAL_SERVICES } from './digital.js';
import { ENVIRONMENT_SERVICES, AGRICULTURE_SERVICES } from './environment.js';
import { SOCIAL_SERVICES } from './social.js';
import { UTILITY_SERVICES } from './utilities.js';
import { CONSTRUCTION_SERVICES, REAL_ESTATE_SERVICES } from './construction.js';
import { CULTURE_SPORT_SERVICES, RELIGION_MILITARY_SERVICES } from './culture_sport.js';
import { CONSUMER_SERVICES, FOREIGN_AFFAIRS_SERVICES, ANTICORRUPTION_SERVICES } from './consumer_foreign.js';

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