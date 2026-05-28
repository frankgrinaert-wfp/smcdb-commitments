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

const ARMENIA_COVERAGE_PROGRESS = {
  date: "May 2025",
  text: "Working toward universal school meal availability through expansion of coverage in Yerevan by 2030, using four delivery models to accommodate varying school conditions.",
};

const ARMENIA_FINANCING_PROGRESS = {
  date: "May 2025",
  text: "Since 2023, the government has taken full responsibility for funding school meals in 10 regions. As of 2025, school meals are integrated as a mandatory budgetary line.",
};

const BENIN_COVERAGE_PROGRESS = {
  date: "May 2025",
  text: "School canteens in rural areas have increased national coverage from 75% to 80% toward a 100% coverage goal by 2026; analysis is underway for urban and peri-urban areas.",
};

const BENIN_LOCAL_PROCUREMENT_PROGRESS = {
  date: "May 2025",
  text: "Direct local purchases increased from 300 tons in 2021 to more than 8,500 tons in 2024.",
};

const BURUNDI_COVERAGE_PROGRESS = {
  date: "May 2025",
  text: "Schoolchildren receiving meals increased from 730,000 in 2023 to 810,000 in 2025; the government tripled the school meals budget from USD 2.5 million (2022–2023) to USD 9 million (2024–2025).",
};

const BURUNDI_PROCUREMENT_PROGRESS = {
  date: "May 2025",
  text: "Local purchases from smallholder farmer cooperatives expanded from 50 schools in 2023 to 264 primary schools in 2025, with plans to reach 851 schools in 2026.",
};

const CAMEROON_PROGRAMME_PROGRESS = {
  date: "May 2025",
  text: "A national school meals programme is being developed with subnational authorities and partners, guided by a new National School Feeding Strategy and a sustainable financing strategy through the Sustainable Financing Initiative.",
};

const CAMEROON_COVERAGE_PROGRESS = {
  date: "May 2025",
  text: "School feeding is included in national education policy with a goal of reaching 1,000,000 children by 2025; the government has budgeted USD 19.4 million and mobilized additional resources through partners.",
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
          text: "Work with partners to expand national coverage for primary school children in ten regions, including the capital city Yerevan, by 2030.",
          latestProgress: null,
        },
        {
          id: "am-2",
          topic: "Nutrition and health",
          topicColor: "blue",
          text: "Develop a national school feeding strategy by 2025, and review and update national standards for school meals based on scientific evidence while incorporating healthy food systems.",
          latestProgress: {
            date: "May 2025",
            text: "National nutrition standards in schools have been revised to align with scientific and internationally accepted standards, and a national school health and nutrition curriculum was introduced in 2024.",
          },
        },
        {
          id: "am-3",
          topic: "Financing",
          topicColor: "pink",
          text: "Sustain and upgrade the annual budget allocation for school meals.",
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
          latestProgress: {
            date: "May 2025",
            text: "Benin actively participates in high-level advocacy platforms, including:\n- WFP Executive Board session in Rome (June 2019), with participation from the Vice President and Minister of Education.\n- First Global Meeting of the School Meals Coalition in Paris (October 2023).\n- 9th African Day of School Feeding in Burundi (February-March 2024).\n- Hosting an exchange visit from a delegation of the Gabonese Govemment in March 2025.",
          },
        },
      ],
    },
    {
      id: "bi-adv",
      country: "Burundi",
      region: "Africa",
      year: 2023,
      commitmentType: "Full Commitment",
      category: "Advocacy and partnerships",
      items: [
        {
          id: "bi-1",
          topic: "Financing",
          topicColor: "pink",
          text: "Gradually increase school feeding coverage for pre- and primary schools from 24% to 50% by 2027 and 100% by 2032, accompanied by an increase in the annual national budget dedicated to school feeding through the Finance Act.",
          latestProgress: BURUNDI_COVERAGE_PROGRESS,
        },
        {
          id: "bi-2",
          topic: "Technical assistance",
          topicColor: "orange",
          text: "Revise and update the National School Feeding Policy by 2024 and integrate school feeding into the Food Fortification Policy and the School Health/Nutrition Strategy by the end of 2025.",
          latestProgress: null,
        },
        {
          id: "bi-3",
          topic: "Sustainability",
          topicColor: "green",
          text: "Scale up decentralized procurement from smallholder farmers and small to medium-scale food processors, targeting at least 50% of supported schools by 2027.",
          latestProgress: BURUNDI_PROCUREMENT_PROGRESS,
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
          text: "Set up a school meal programme in collaboration with decentralized local authorities, technical and financial partners, civil society organizations, and sectoral ministries.",
          latestProgress: CAMEROON_PROGRAMME_PROGRESS,
        },
        {
          id: "cm-2",
          topic: "Technical assistance",
          topicColor: "orange",
          text: "Finalize the School Feeding Strategy 2023–2030 and its action plan, and include school nutrition in the Education Sector Strategy.",
          latestProgress: null,
        },
        {
          id: "cm-3",
          topic: "Nutrition and health",
          topicColor: "blue",
          text: "Increase coverage to reach up to one million schoolchildren by 2025.",
          latestProgress: CAMEROON_COVERAGE_PROGRESS,
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
