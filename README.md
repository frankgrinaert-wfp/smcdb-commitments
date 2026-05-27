# SMC Commitments — Interactive Prototype

A React + Tailwind prototype extending the [School Meals Coalition Database](https://www.schoolmealscoalitiondatabase.wfp.org/database) with **SMC Commitments and Progress Reports** views from stakeholder mockups.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

## What you can test

### Overview matrix
- Navigate via sidebar → **Overview matrix** (or default landing view)
- Filter by country/region, category, active status
- Toggle **Group Regions** to cluster rows under regional headers
- Paginate through countries (14 per page)
- **Export data** downloads a CSV of the full overview dataset

### Category detail (e.g. Advocacy and Partnerships)
- Click any commitment category in the sidebar
- Expand/collapse countries to see commitments, topic tags, and progress notes
- Filter by country, topic, and progress status
- Sample data mirrors the mockup (Benin, Brazil, etc.)

### Shared UI
- Header and sidebar match the existing database layout patterns
- Indicator topics accordion (placeholder sub-items for prototype)
- Clear all filters resets state

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Lucide React icons

## Project structure

```
src/
  components/     # Header, Sidebar, filters, tables
  data/           # Mock countries & commitments
  types/          # Shared TypeScript types
  utils/          # CSV export helper
```

Mock data is in `src/data/mockData.ts` — edit there to iterate on copy, countries, and commitment examples.
