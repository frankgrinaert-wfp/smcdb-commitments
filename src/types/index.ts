export const COMMITMENT_CATEGORIES = [
  "Advocacy and partnerships",
  "Evidence and data",
  "Financing",
  "Institutional",
  "Policy",
  "Programme",
] as const;

export type CommitmentCategory = (typeof COMMITMENT_CATEGORIES)[number];

export type ViewId = "overview" | CommitmentCategory;

export interface CountryOverviewRow {
  id: string;
  name: string;
  region: string;
  counts: Partial<Record<CommitmentCategory, number>>;
  progressReport: boolean;
}

export type TopicTagColor = "pink" | "blue" | "orange" | "green" | "purple";

export interface LatestProgress {
  date: string;
  text: string;
}

export interface CommitmentItem {
  id: string;
  category: CommitmentCategory;
  topic: string;
  topicColor: TopicTagColor;
  text: string;
  latestProgress: LatestProgress | null;
}

export interface CountryCommitmentGroup {
  id: string;
  country: string;
  region: string;
  year: number;
  commitmentType: "Full Commitment" | "Partial Commitment";
  category: CommitmentCategory;
  items: CommitmentItem[];
}

export interface Filters {
  country: string;
  category: string;
  topic: string;
  status: string;
  latestProgress: string;
}
