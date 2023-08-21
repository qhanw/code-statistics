import { Menu, Typography } from "antd";
import { Link } from "@remix-run/react";

import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "code statistics" },
    { name: "description", content: "code statistics!" },
  ];
};

export default function Index() {
  return (
    <div className="pb-4">
      <Typography.Title>Code Statistics</Typography.Title>
      <Menu
        mode="horizontal"
        items={[
          { key: "/projects", label: <Link to={"/projects"}>项目</Link> },
          {
            key: "/statistics/own",
            label: <Link to={"/statistics/own"}>Own</Link>,
          },
          {
            key: "/statistics/personal",
            label: <Link to={"/statistics/personal"}>个人统计</Link>,
          },
          {
            key: "/statistics/projects",
            label: <Link to={"/statistics/projects"}>项目统计</Link>,
          },
        ]}
      />
    </div>
  );
}
