import { column, type Payment } from "./column";
import { DataTable } from "../components/data-table";
import { LineChart } from "../components/line-chart";

import { queryStatistics } from "../actions";

// remix
// export const loader = async () => {
//   const data = await getStatistics({ email: ["wangqihan", "whenhan"] });

//   return data.filter((c) => c.total > 100);
// };

// [
//   // { title: "应用ID", dataIndex: "pid" },
//   { title: "应用名称", dataIndex: "name" },
//   // { title: "应用描述", dataIndex: "description" },

//   {
//     title: "新增",
//     dataIndex: "added",
//     render: (v: string) => (
//       <Typography.Text type="success">{v}</Typography.Text>
//     ),
//   },
//   {
//     title: "删除",
//     dataIndex: "removed",
//     render: (v: string) => <Typography.Text type="danger">{v}</Typography.Text>,
//   },
//   {
//     title: "共计",
//     dataIndex: "total",
//     render: (v: string) => (
//       <Typography.Text type="warning">{v}</Typography.Text>
//     ),
//   },
// ];

// const projects = [
//   "sso",
//   "oagw",
//   "bs-ds",
//   "effe",
//   "crm",
//   "sales",
//   "luban",
//   "ticket",
//   "crm",
//   "ugc",
//   "message",
//   "call",
//   "monitor",
//   "umi-plugin-extract-auth",
// ];

export default async function Own() {
  const list = (
    await queryStatistics({ email: ["wangqihan", "whenhan"] })
  )?.filter((c) => c.total > 100);

  return (
    <>
      <div className="relative z-10 flex items-baseline justify-between py-6 border-b border-gray-200">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Myself code commits statistics
        </h1>
      </div>
      <LineChart data={list} />
      <DataTable<Payment> data={list} columns={column} />
    </>
  );
}
