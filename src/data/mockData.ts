import type {
  CommitmentCategory,
  CountryCommitmentGroup,
  CountryOverviewRow,
} from '../types'
import { COMMITMENT_CATEGORIES } from '../types'

export const REGIONS = [
  'Africa',
  'Asia',
  'Europe',
  'Latin America and Caribbean',
  'Middle East',
  'North America',
  'Oceania',
] as const

export const COUNTRIES = [
  { id: 'af', name: 'Afghanistan', region: 'Asia' },
  { id: 'al', name: 'Albania', region: 'Europe' },
  { id: 'dz', name: 'Algeria', region: 'Africa' },
  { id: 'ad', name: 'Andorra', region: 'Europe' },
  { id: 'ao', name: 'Angola', region: 'Africa' },
  { id: 'ag', name: 'Antigua and Barbuda', region: 'Latin America and Caribbean' },
  { id: 'ar', name: 'Argentina', region: 'Latin America and Caribbean' },
  { id: 'am', name: 'Armenia', region: 'Asia' },
  { id: 'au', name: 'Australia', region: 'Oceania' },
  { id: 'at', name: 'Austria', region: 'Europe' },
  { id: 'az', name: 'Azerbaijan', region: 'Asia' },
  { id: 'bs', name: 'Bahamas', region: 'Latin America and Caribbean' },
  { id: 'bh', name: 'Bahrain', region: 'Middle East' },
  { id: 'bd', name: 'Bangladesh', region: 'Asia' },
  { id: 'bb', name: 'Barbados', region: 'Latin America and Caribbean' },
  { id: 'by', name: 'Belarus', region: 'Europe' },
  { id: 'be', name: 'Belgium', region: 'Europe' },
  { id: 'bz', name: 'Belize', region: 'Latin America and Caribbean' },
  { id: 'bj', name: 'Benin', region: 'Africa' },
  { id: 'bt', name: 'Bhutan', region: 'Asia' },
  { id: 'bo', name: 'Bolivia', region: 'Latin America and Caribbean' },
  { id: 'ba', name: 'Bosnia and Herzegovina', region: 'Europe' },
  { id: 'bw', name: 'Botswana', region: 'Africa' },
  { id: 'br', name: 'Brazil', region: 'Latin America and Caribbean' },
  { id: 'bn', name: 'Brunei', region: 'Asia' },
  { id: 'bg', name: 'Bulgaria', region: 'Europe' },
  { id: 'bf', name: 'Burkina Faso', region: 'Africa' },
  { id: 'bi', name: 'Burundi', region: 'Africa' },
  { id: 'cv', name: 'Cabo Verde', region: 'Africa' },
  { id: 'kh', name: 'Cambodia', region: 'Asia' },
  { id: 'cm', name: 'Cameroon', region: 'Africa' },
  { id: 'ca', name: 'Canada', region: 'North America' },
  { id: 'cf', name: 'Central African Republic', region: 'Africa' },
  { id: 'td', name: 'Chad', region: 'Africa' },
  { id: 'cl', name: 'Chile', region: 'Latin America and Caribbean' },
  { id: 'cn', name: 'China', region: 'Asia' },
  { id: 'co', name: 'Colombia', region: 'Latin America and Caribbean' },
] as const

function hashSeed(id: string): number {
  return id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
}

export function buildOverviewRows(): CountryOverviewRow[] {
  return COUNTRIES.map((c) => {
    const seed = hashSeed(c.id)
    const counts: CountryOverviewRow['counts'] = {}
    COMMITMENT_CATEGORIES.forEach((cat, i) => {
      const val = (seed + i * 7) % 11
      if (val > 2 && val < 9) counts[cat] = val % 6 || 1
    })
    return {
      id: c.id,
      name: c.name,
      region: c.region,
      counts,
      progressReport: seed % 4 === 0,
    }
  })
}

const BENIN_PROGRESS =
  'May 2025: Benin participated in high-level platforms including the WFP Executive Board, the Global Meeting of the School Meals Coalition, and regional awareness sessions on school food funding.'

const BRAZIL_PROGRESS =
  'May 2025: Awareness campaigns and technical exchanges on school feeding policy were conducted with partner countries through the School Meals Coalition.'

export const CATEGORY_COMMITMENTS: Record<
  CommitmentCategory,
  CountryCommitmentGroup[]
> = {
  'Advocacy and Partnerships': [
    {
      id: 'am-adv',
      country: 'Armenia',
      region: 'Asia',
      year: 2023,
      commitmentType: 'Full Commitment',
      category: 'Advocacy and Partnerships',
      items: [
        {
          id: 'am-1',
          topic: 'Policy',
          topicColor: 'purple',
          text: 'Strengthen national advocacy for school meal programmes through parliamentary engagement.',
          progress: null,
        },
      ],
    },
    {
      id: 'bj-adv',
      country: 'Benin',
      region: 'Africa',
      year: 2023,
      commitmentType: 'Full Commitment',
      category: 'Advocacy and Partnerships',
      items: [
        {
          id: 'bj-1',
          topic: 'Financing',
          topicColor: 'pink',
          text: 'Participate in regional and international awareness-raising campaigns for school food funding.',
          progress: BENIN_PROGRESS,
        },
      ],
    },
    {
      id: 'br-adv',
      country: 'Brazil',
      region: 'Latin America and Caribbean',
      year: 2023,
      commitmentType: 'Full Commitment',
      category: 'Advocacy and Partnerships',
      items: [
        {
          id: 'br-1',
          topic: 'Nutritional Health',
          topicColor: 'blue',
          text: 'Promote the consumption of fresh and minimally processed foods in school meal programmes.',
          progress: null,
        },
        {
          id: 'br-2',
          topic: 'Technical Assistance',
          topicColor: 'orange',
          text: 'Support the implementation of global policies on school feeding through technical cooperation.',
          progress: BRAZIL_PROGRESS,
        },
        {
          id: 'br-3',
          topic: 'Technical Assistance',
          topicColor: 'orange',
          text: 'Facilitate South-South cooperation on school meal programme design and delivery.',
          progress: BRAZIL_PROGRESS,
        },
        {
          id: 'br-4',
          topic: 'Technical Assistance',
          topicColor: 'orange',
          text: 'Strengthen the RAES network for knowledge exchange on school feeding in Latin America.',
          progress: null,
        },
        {
          id: 'br-5',
          topic: 'Sustainability',
          topicColor: 'green',
          text: 'Promote engagement with the School Meals Coalition at regional and global forums.',
          progress: null,
        },
      ],
    },
    {
      id: 'bi-adv',
      country: 'Burundi',
      region: 'Africa',
      year: 2023,
      commitmentType: 'Partial Commitment',
      category: 'Advocacy and Partnerships',
      items: [
        {
          id: 'bi-1',
          topic: 'Partnerships',
          topicColor: 'pink',
          text: 'Engage civil society partners in national school feeding advocacy.',
          progress: 'March 2025: Initial stakeholder mapping completed.',
        },
      ],
    },
    {
      id: 'cm-adv',
      country: 'Cameroon',
      region: 'Africa',
      year: 2023,
      commitmentType: 'Full Commitment',
      category: 'Advocacy and Partnerships',
      items: [
        {
          id: 'cm-1',
          topic: 'Advocacy',
          topicColor: 'orange',
          text: 'Raise visibility of school meal programmes in national development planning.',
          progress: null,
        },
      ],
    },
  ],
  'Evidence and Data': [
    {
      id: 'br-ev',
      country: 'Brazil',
      region: 'Latin America and Caribbean',
      year: 2023,
      commitmentType: 'Full Commitment',
      category: 'Evidence and Data',
      items: [
        {
          id: 'br-ev-1',
          topic: 'Monitoring',
          topicColor: 'blue',
          text: 'Improve routine monitoring of school meal coverage and nutritional quality indicators.',
          progress: 'April 2025: Pilot dashboard launched in three states.',
        },
      ],
    },
    {
      id: 'ke-ev',
      country: 'Kenya',
      region: 'Africa',
      year: 2024,
      commitmentType: 'Full Commitment',
      category: 'Evidence and Data',
      items: [
        {
          id: 'ke-ev-1',
          topic: 'Data Systems',
          topicColor: 'green',
          text: 'Integrate school feeding data into national education management information systems.',
          progress: null,
        },
      ],
    },
  ],
  Financing: [
    {
      id: 'sn-fin',
      country: 'Senegal',
      region: 'Africa',
      year: 2024,
      commitmentType: 'Full Commitment',
      category: 'Financing',
      items: [
        {
          id: 'sn-fin-1',
          topic: 'Domestic Funding',
          topicColor: 'pink',
          text: 'Increase domestic budget allocation for school meal programmes by 15% by 2027.',
          progress: 'January 2025: Budget line established in national accounts.',
        },
      ],
    },
  ],
  Institutional: [
    {
      id: 'gh-inst',
      country: 'Ghana',
      region: 'Africa',
      year: 2023,
      commitmentType: 'Full Commitment',
      category: 'Institutional',
      items: [
        {
          id: 'gh-inst-1',
          topic: 'Governance',
          topicColor: 'purple',
          text: 'Establish a national inter-ministerial coordination body for school feeding.',
          progress: 'June 2025: Terms of reference approved.',
        },
      ],
    },
  ],
  Policy: [
    {
      id: 'in-pol',
      country: 'India',
      region: 'Asia',
      year: 2023,
      commitmentType: 'Full Commitment',
      category: 'Policy',
      items: [
        {
          id: 'in-pol-1',
          topic: 'Legal Framework',
          topicColor: 'blue',
          text: 'Align national school feeding standards with updated nutritional guidelines.',
          progress: null,
        },
      ],
    },
  ],
  Programme: [
    {
      id: 'et-prog',
      country: 'Ethiopia',
      region: 'Africa',
      year: 2024,
      commitmentType: 'Full Commitment',
      category: 'Programme',
      items: [
        {
          id: 'et-prog-1',
          topic: 'Scale-up',
          topicColor: 'green',
          text: 'Expand home-grown school feeding to an additional 2 million children by 2026.',
          progress: 'February 2025: 400,000 additional children reached in pilot districts.',
        },
      ],
    },
  ],
}

export const TOPIC_OPTIONS = [
  'All topics',
  'Financing',
  'Nutritional Health',
  'Technical Assistance',
  'Sustainability',
  'Policy',
  'Monitoring',
  'Partnerships',
  'Advocacy',
  'Domestic Funding',
  'Governance',
  'Legal Framework',
  'Scale-up',
  'Data Systems',
]

export const STATUS_OPTIONS = ['Currently Active / All', 'Currently Active', 'All']
