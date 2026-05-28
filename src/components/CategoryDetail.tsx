import { useMemo, useState } from "react";
import type { CountryCommitmentGroup, Filters, LatestProgress } from "../types";
import { CountryWithFlag } from "../utils/countryFlag";
import { TopicTag } from "./TopicTag";
import { UpdateDetailDialog } from "./UpdateDetailDialog";

interface CategoryDetailProps {
  groups: CountryCommitmentGroup[];
  filters: Filters;
}

interface FlatRow {
  id: string;
  country: string;
  year: number;
  topic: string;
  topicColor: CountryCommitmentGroup["items"][number]["topicColor"];
  commitment: string;
  latestProgress: LatestProgress | null;
}

export function CategoryDetail({ groups, filters }: CategoryDetailProps) {
  const [openProgress, setOpenProgress] = useState<LatestProgress | null>(null);

  const rows = useMemo(() => {
    const result: FlatRow[] = [];

    for (const group of groups) {
      let items = [...group.items];

      if (filters.country) {
        const q = filters.country.toLowerCase();
        if (
          !group.country.toLowerCase().includes(q) &&
          !group.region.toLowerCase().includes(q)
        ) {
          continue;
        }
      }

      if (filters.topic && filters.topic !== "All topic") {
        items = items.filter((item) => item.topic === filters.topic);
      }

      if (filters.latestProgress === "With progress") {
        items = items.filter((item) => item.latestProgress);
      } else if (filters.latestProgress === "No progress yet") {
        items = items.filter((item) => !item.latestProgress);
      }

      for (const item of items) {
        result.push({
          id: item.id,
          country: group.country,
          year: group.year,
          topic: item.topic,
          topicColor: item.topicColor,
          commitment: item.text,
          latestProgress: item.latestProgress,
        });
      }
    }

    return result;
  }, [groups, filters]);

  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700">
                Country
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700">
                Topic
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700">
                Commitment
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700">
                Year
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-gray-700">
                Latest progress
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center text-gray-500"
                >
                  No commitments match your filters.
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-100 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
                >
                  <td className="px-3 py-3 align-top font-semibold text-gray-900">
                    <CountryWithFlag name={row.country} />
                  </td>
                  <td className="px-3 py-3 align-top">
                    <TopicTag label={row.topic} color={row.topicColor} />
                  </td>
                  <td className="px-3 py-3 align-top text-sm leading-relaxed text-gray-800">
                    {row.commitment}
                  </td>
                  <td className="px-3 py-3 align-top text-sm">
                    <div>
                      <div className="text-gray-900 whitespace-nowrap">{row.year}</div>
                      <button
                        type="button"
                        className="mt-0.5 whitespace-nowrap text-sky-700 hover:text-sky-900 hover:underline"
                      >
                        Commitment details
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-3 align-top text-sm">
                    {row.latestProgress ? (
                      <div>
                        <div className="text-gray-900 whitespace-nowrap">
                          {row.latestProgress.date}
                        </div>
                        <button
                          type="button"
                          onClick={() => setOpenProgress(row.latestProgress)}
                          className="mt-0.5 whitespace-nowrap text-sky-700 hover:text-sky-900 hover:underline"
                        >
                          Progress details
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <UpdateDetailDialog
        open={openProgress !== null}
        date={openProgress?.date ?? ""}
        text={openProgress?.text ?? ""}
        onClose={() => setOpenProgress(null)}
      />
    </div>
  );
}
