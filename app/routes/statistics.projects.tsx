import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";
import { useLoaderData } from "@remix-run/react";
import { Table, Typography } from "antd";

import { getStatistics } from "~/code/services";

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

export const loader = async () => {
  return await getStatistics({ projects });
};

export default function Admin() {
  const apps = useLoaderData<any>();

  const ref = useRef<any>();

  const columns = [
    {
      title: "序号",
      dataIndex: "id",
      render: (_: any, row: any, index: number) => index + 1,
    },
    // { title: "应用ID", dataIndex: "pid" },
    { title: "应用名称", dataIndex: "name" },
    // { title: "应用描述", dataIndex: "description" },
    {
      title: "新增",
      dataIndex: "added",
      render: (v: string) => (
        <Typography.Text type="success">{v}</Typography.Text>
      ),
    },
    {
      title: "删除",
      dataIndex: "removed",
      render: (v: string) => (
        <Typography.Text type="danger">{v}</Typography.Text>
      ),
    },
    {
      title: "共计",
      dataIndex: "total",
      render: (v: string) => (
        <Typography.Text type="warning">{v}</Typography.Text>
      ),
    },
  ];

  useEffect(() => {
    let chart: Chart;
    if (ref.current) {
      const dataSet = apps.reduce(
        (prev: any, curr: any) => {
          if (curr.sum === "total_commit") return prev;
          prev.labels.push(curr.name);
          prev.added.push(curr.added);
          prev.removed.push(curr.removed);
          prev.total.push(curr.total);

          return prev;
        },
        { labels: [], added: [], removed: [], total: [] }
      );

      chart = new Chart(ref.current, {
        type: "bar",
        data: {
          labels: dataSet.labels,
          datasets: [
            {
              label: "新增",
              data: dataSet.added,
              backgroundColor: "rgb(75, 192, 192, .5)",
              borderColor: "rgb(75, 192, 192)",
            },
            {
              label: "删除",
              data: dataSet.removed,
              backgroundColor: "rgb(255, 99, 132, .5)",
              borderColor: "rgb(255, 99, 132)",
            },
            {
              label: "共计",
              data: dataSet.total,
              backgroundColor: "rgb(54, 162, 235, .5)",
              borderColor: "rgb(54, 162, 235)",
            },
          ],
        },
      });
    }
    return () => {
      chart?.destroy();
    };
  }, []);

  return (
    <>
      <div className="relative z-10 flex items-baseline justify-between py-6 border-b border-gray-200">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Team code commits statistics
        </h1>
      </div>
      <canvas ref={ref} />
      <Table
        rowKey={(r) => r.name || r.sum}
        size="small"
        pagination={false}
        columns={columns}
        dataSource={apps || []}
      />
    </>
  );
}
