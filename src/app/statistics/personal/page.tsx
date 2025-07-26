import { column, type Payment } from "./column";

import { DataTable } from "../components/data-table";
import { LineChart } from "../components/line-chart";

import { queryUserStatistics } from "../actions";

export default async function Personal() {
  const list = await queryUserStatistics();

  return (
    <>
      <div className="relative z-10 flex items-baseline justify-between py-6 border-b border-gray-200">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Personal code commits statistics
        </h1>
      </div>
      <LineChart data={list} />
      <DataTable<Payment> data={list} columns={column} />
    </>
  );
}
