import { Outlet, Link, useLoaderData } from "remix";
import { Table } from "antd";
import {
  getApps,
  // getAppsBranch,
  // getAppsCommits,
  // getCommitStatistics,
} from "~/code/services";

export const loader = async () => {
  const apps = await getApps();
  // const branch = await getAppsBranch(624);
  //   const commits = await getAppsCommits({
  //     projectId: 239,
  //     branch: "master",
  //     since: "2021-01-01 00:00:00",
  //     until: "2021-12-31 23:59:59",
  //   });
  // const events = await getEvents();

  // const d = await init();

  //   const commit = await getCommitStatistics(
  //     239,
  //     "fd06198eb226d3efa0284cae9b7f5fa6b961a1b0"
  //   );

  return {
    apps,
    // branch,
    // commits,
    // commit,
    // id,
  };
};

export default function Admin() {
  const { apps, branch, commits, commit, d } = useLoaderData<any>();

  console.log(apps, branch, commits, commit, d);

  const columns = [
    { title: "应用ID", dataIndex: "id" },
    { title: "应用名称", dataIndex: "name" },
    { title: "应用描述", dataIndex: "description" },
    { title: "added lines", dataIndex: "ci_default_git_depth" },
    { title: "removed lines", dataIndex: "build_timeout" },
    { title: "total lines", dataIndex: "creator_id" },
  ];

  return (
    <>
      <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          code statistics personal
        </h1>
      </div>

      <Table
        rowKey="pid"
        size="small"
        pagination={false}
        columns={columns}
        dataSource={apps || []}
      />
    </>
  );
}
