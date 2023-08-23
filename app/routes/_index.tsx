import { Typography } from "antd";

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
    </div>
  );
}
