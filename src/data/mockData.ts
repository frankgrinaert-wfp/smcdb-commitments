import type {
  CommitmentCategory,
  CountryCommitmentGroup,
  CountryOverviewRow,
} from "../types";
import { COMMITMENT_CATEGORIES } from "../types";

export const REGIONS = [
  "Africa",
  "Asia",
  "Europe",
  "Latin America and Caribbean",
  "Middle East",
  "North America",
  "Oceania",
] as const;

export const COUNTRIES = [
  { id: "af", name: "Afghanistan", region: "Asia" },
  { id: "al", name: "Albania", region: "Europe" },
  { id: "dz", name: "Algeria", region: "Africa" },
  { id: "ad", name: "Andorra", region: "Europe" },
  { id: "ao", name: "Angola", region: "Africa" },
  {
    id: "ag",
    name: "Antigua and Barbuda",
    region: "Latin America and Caribbean",
  },
  { id: "ar", name: "Argentina", region: "Latin America and Caribbean" },
  { id: "am", name: "Armenia", region: "Asia" },
  { id: "au", name: "Australia", region: "Oceania" },
  { id: "at", name: "Austria", region: "Europe" },
  { id: "az", name: "Azerbaijan", region: "Asia" },
  { id: "bs", name: "Bahamas", region: "Latin America and Caribbean" },
  { id: "bh", name: "Bahrain", region: "Middle East" },
  { id: "bd", name: "Bangladesh", region: "Asia" },
  { id: "bb", name: "Barbados", region: "Latin America and Caribbean" },
  { id: "by", name: "Belarus", region: "Europe" },
  { id: "be", name: "Belgium", region: "Europe" },
  { id: "bz", name: "Belize", region: "Latin America and Caribbean" },
  { id: "bj", name: "Benin", region: "Africa" },
  { id: "bt", name: "Bhutan", region: "Asia" },
  { id: "bo", name: "Bolivia", region: "Latin America and Caribbean" },
  { id: "ba", name: "Bosnia and Herzegovina", region: "Europe" },
  { id: "bw", name: "Botswana", region: "Africa" },
  { id: "br", name: "Brazil", region: "Latin America and Caribbean" },
  { id: "bn", name: "Brunei", region: "Asia" },
  { id: "bg", name: "Bulgaria", region: "Europe" },
  { id: "bf", name: "Burkina Faso", region: "Africa" },
  { id: "bi", name: "Burundi", region: "Africa" },
  { id: "cv", name: "Cabo Verde", region: "Africa" },
  { id: "kh", name: "Cambodia", region: "Asia" },
  { id: "cm", name: "Cameroon", region: "Africa" },
  { id: "ca", name: "Canada", region: "North America" },
  { id: "cf", name: "Central African Republic", region: "Africa" },
  { id: "td", name: "Chad", region: "Africa" },
  { id: "cl", name: "Chile", region: "Latin America and Caribbean" },
  { id: "cn", name: "China", region: "Asia" },
  { id: "co", name: "Colombia", region: "Latin America and Caribbean" },
] as const;

function hashSeed(id: string): number {
  return id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
}

export function buildOverviewRows(): CountryOverviewRow[] {
  return COUNTRIES.map((c) => {
    const seed = hashSeed(c.id);
    const counts: CountryOverviewRow["counts"] = {};
    COMMITMENT_CATEGORIES.forEach((cat, i) => {
      const val = (seed + i * 7) % 11;
      if (val > 2 && val < 9) counts[cat] = val % 6 || 1;
    });
    return {
      id: c.id,
      name: c.name,
      region: c.region,
      counts,
      progressReport: seed % 4 === 0,
    };
  });
}

const BENIN_PROGRESS = {
  date: "May 2025",
  text: "Benin participated in high-level platforms including the WFP Executive Board, the Global Meeting of the School Meals Coalition, and regional awareness sessions on school food funding.",
};

const BRAZIL_PROGRESS = {
  date: "May 2025",
  text: "Awareness campaigns and technical exchanges on school feeding policy were conducted with partner countries through the School Meals Coalition.",
};

export const CATEGORY_COMMITMENTS: Record<
  CommitmentCategory,
  CountryCommitmentGroup[]
> = {
  "Advocacy and partnerships": [
    {
      id: "am-adv",
      country: "Armenia",
      region: "Asia",
      year: 2023,
      commitmentType: "Full Commitment",
      category: "Advocacy and partnerships",
      items: [
        {
          id: "am-1",
          topic: "Technical assistance",
          topicColor: "orange",
          text: "Strengthen national advocacy for school meal programmes through parliamentary engagement.",
          latestProgress: null,
        },
      ],
    },
    {
      id: "bj-adv",
      country: "Benin",
      region: "Africa",
      year: 2023,
      commitmentType: "Full Commitment",
      category: "Advocacy and partnerships",
      items: [
        {
          id: "bj-1",
          topic: "Financing",
          topicColor: "pink",
          text: "Participate in regional and international awareness-raising campaigns for school food funding.",
          latestProgress: BENIN_PROGRESS,
        },
      ],
    },
    {
      id: "br-adv",
      country: "Brazil",
      region: "Latin America and Caribbean",
      year: 2023,
      commitmentType: "Full Commitment",
      category: "Advocacy and partnerships",
      items: [
        {
          id: "br-1",
          topic: "Nutrition and health",
          topicColor: "blue",
          text: "Promote campaigns to highlight the value of fresh and minimally processed foods, encouraging conscious and balanced choices and promote health, raising awareness of the risks of ultra-processed foods, and recommending reducing their intake, while also emphasizing the importance of valuing the act of eating as a moment of social connection and pleasure.",
          latestProgress: null,
        },
        {
          id: "br-2",
          topic: "Technical assistance",
          topicColor: "orange",
          text: "Encourage and support the implementation of school meals policies worldwide, facilitating the exchange of experiences and best practices among countries.",
          latestProgress: BRAZIL_PROGRESS,
        },
        {
          id: "br-3",
          topic: "Technical assistance",
          topicColor: "orange",
          text: "Within the framework of South-South cooperation (SSC), Brazil is committed to sharing with interested members of the School Meals Coalition (SMC) the experience of the Brazilian Cooperation Agency of the Ministry of Foreign Affairs (ABC/MRE) in coordinating cooperation initiatives related to school meals.",
          latestProgress: BRAZIL_PROGRESS,
        },
        {
          id: "br-5",
          topic: "Sustainability",
          topicColor: "green",
          text: "As the leader of the Sustainable School Meals Network (RAES), an initiative that involves 26 countries from Latin America and the Caribbean, and within the scope of South-South cooperation (SSC), Brazil is committed to promoting greater engagement of countries with the SMC within the network.",
          latestProgress: null,
        },
      ],
    },
    {
      id: "bi-adv",
      country: "Burundi",
      region: "Africa",
      year: 2023,
      commitmentType: "Partial Commitment",
      category: "Advocacy and partnerships",
      items: [
        {
          id: "bi-1",
          topic: "Technical assistance",
          topicColor: "orange",
          text: "Engage civil society partners in national school feeding advocacy.",
          latestProgress: {
            date: "March 2025",
            text: "Initial stakeholder mapping completed.",
          },
        },
      ],
    },
    {
      id: "cm-adv",
      country: "Cameroon",
      region: "Africa",
      year: 2023,
      commitmentType: "Full Commitment",
      category: "Advocacy and partnerships",
      items: [
        {
          id: "cm-1",
          topic: "Technical assistance",
          topicColor: "orange",
          text: "Raise visibility of school meal programmes in national development planning.",
          latestProgress: null,
        },
      ],
    },
  ],
  "Evidence and data": [
    {
      id: "br-ev",
      country: "Brazil",
      region: "Latin America and Caribbean",
      year: 2023,
      commitmentType: "Full Commitment",
      category: "Evidence and data",
      items: [
        {
          id: "br-ev-1",
          topic: "Technical assistance",
          topicColor: "orange",
          text: "Improve routine monitoring of school meal coverage and nutritional quality indicators.",
          latestProgress: {
            date: "April 2025",
            text: "Pilot dashboard launched in three states.",
          },
        },
      ],
    },
    {
      id: "ke-ev",
      country: "Kenya",
      region: "Africa",
      year: 2024,
      commitmentType: "Full Commitment",
      category: "Evidence and data",
      items: [
        {
          id: "ke-ev-1",
          topic: "Technical assistance",
          topicColor: "orange",
          text: "Integrate school feeding data into national education management information systems.",
          latestProgress: null,
        },
      ],
    },
  ],
  Financing: [
    {
      id: "sn-fin",
      country: "Senegal",
      region: "Africa",
      year: 2024,
      commitmentType: "Full Commitment",
      category: "Financing",
      items: [
        {
          id: "sn-fin-1",
          topic: "Financing",
          topicColor: "pink",
          text: "Increase domestic budget allocation for school meal programmes by 15% by 2027.",
          latestProgress: {
            date: "January 2025",
            text: "Budget line established in national accounts.",
          },
        },
      ],
    },
  ],
  Institutional: [
    {
      id: "gh-inst",
      country: "Ghana",
      region: "Africa",
      year: 2023,
      commitmentType: "Full Commitment",
      category: "Institutional",
      items: [
        {
          id: "gh-inst-1",
          topic: "Technical assistance",
          topicColor: "orange",
          text: "Establish a national inter-ministerial coordination body for school feeding.",
          latestProgress: {
            date: "June 2025",
            text: "Terms of reference approved.",
          },
        },
      ],
    },
  ],
  Policy: [
    {
      id: "in-pol",
      country: "India",
      region: "Asia",
      year: 2023,
      commitmentType: "Full Commitment",
      category: "Policy",
      items: [
        {
          id: "in-pol-1",
          topic: "Technical assistance",
          topicColor: "orange",
          text: "Align national school feeding standards with updated nutritional guidelines.",
          latestProgress: null,
        },
      ],
    },
  ],
  Programme: [
    {
      id: "et-prog",
      country: "Ethiopia",
      region: "Africa",
      year: 2024,
      commitmentType: "Full Commitment",
      category: "Programme",
      items: [
        {
          id: "et-prog-1",
          topic: "Sustainability",
          topicColor: "green",
          text: "Expand home-grown school feeding to an additional 2 million children by 2026.",
          latestProgress: {
            date: "February 2025",
            text: "400,000 additional children reached in pilot districts.",
          },
        },
      ],
    },
  ],
};

export const TOPIC_OPTIONS = [
  "Financing",
  "Nutrition and health",
  "Technical assistance",
  "Sustainability",
];

export const STATUS_OPTIONS = [
  "Currently active / all",
  "Currently active",
  "All",
];
