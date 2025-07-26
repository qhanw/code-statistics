import { DataTable } from "./data-table";
import { columns, type Payment } from "./columns";

import { queryApps } from "./actions";

// remix
// export const loader = async () => {
//   const apps = await getApps();
//   // const branch = await getAppsBranch(624);
//   //   const commits = await getAppsCommits({
//   //     projectId: 239,
//   //     branch: "master",
//   //     since: "2021-01-01 00:00:00",
//   //     until: "2021-12-31 23:59:59",
//   //   });
//   // const events = await getEvents();

//   // const d = await init();

//   //   const commit = await getCommitStatistics(
//   //     239,
//   //     "fd06198eb226d3efa0284cae9b7f5fa6b961a1b0"
//   //   );

//   return {
//     apps,
//     // branch,
//     // commits,
//     // commit,
//     // id,
//   };
// };

export default async function Projects() {
  const apps = await queryApps();

  return (
    <>
      <div className="relative z-10 flex items-baseline justify-between py-6 border-b border-gray-200 mb-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Code statistics personal
        </h1>
      </div>
      <DataTable<Payment, Payment> data={apps as any} columns={columns} />
    </>
  );
}
