import { column, type Payment } from "./column";
import { DataTable } from "../components/data-table";
import { LineChart } from "../components/line-chart";

import { queryStatistics } from "../actions";

const projects = [
  "sso",
  "oagw",
  "bs-ds",
  "effe",
  "crm",
  "sales",
  "luban",
  "ticket",
  "crm",
  "ugc",
  "message",
  "call",
  "monitor",
  "umi-plugin-extract-auth",
];

export default async function Projects() {
  const list = await queryStatistics({ projects });

  return (
    <>
      <div className="relative z-10 flex items-baseline justify-between py-6 border-b border-gray-200">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Projects code commits statistics of team
        </h1>
      </div>
      <LineChart data={list} />
      <DataTable<Payment> data={list} columns={column} />
    </>
  );
}
