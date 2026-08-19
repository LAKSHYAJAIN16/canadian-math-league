/** Single source of truth for Canadian provinces/territories — used by the
 * registration form, its API validation, and the Province type. */
export const PROVINCES = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Northwest Territories',
  'Nova Scotia',
  'Nunavut',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Yukon',
] as const

export type Province = (typeof PROVINCES)[number]
