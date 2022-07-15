import clsx from "clsx";
import { Menu, Typography } from "antd";
import { Link } from "remix";
export default function Index() {
  return (
    <div className="pb-4">
      <Typography.Title>Code Statistics</Typography.Title>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link to={"/projects"}>项目</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={"/statistics/own"}>Own</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={"/statistics/personal"}>个人统计</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={"/statistics/projects"}>项目统计</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}
