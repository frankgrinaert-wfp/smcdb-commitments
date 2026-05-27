import { COUNTRIES } from '../data/mockData'

const EXTRA_COUNTRY_CODES: Record<string, string> = {
  Kenya: 'ke',
  Senegal: 'sn',
  Ghana: 'gh',
  India: 'in',
  Ethiopia: 'et',
}

const NAME_TO_CODE = new Map<string, string>(
  COUNTRIES.map((c) => [c.name, c.id]),
)

for (const [name, code] of Object.entries(EXTRA_COUNTRY_CODES)) {
  NAME_TO_CODE.set(name, code)
}

function codeToFlag(code: string): string {
  return [...code.toUpperCase()]
    .map((char) => String.fromCodePoint(0x1f1e6 - 65 + char.charCodeAt(0)))
    .join('')
}

export function countryWithFlag(name: string): string {
  const code = NAME_TO_CODE.get(name)
  if (!code) return name
  return `${codeToFlag(code)} ${name}`
}
