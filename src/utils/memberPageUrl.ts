export function memberPageUrl(countryName: string): string {
  const slug = countryName.toLowerCase().replace(/\s+/g, '-')
  return `https://schoolmealscoalition.org/member/${slug}`
}
