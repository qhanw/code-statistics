import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
} from "@remix-run/react";

import { Menu } from "antd";

import reset from "@unocss/reset/tailwind.css";
import unocss from "~/uno.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: reset },
  { rel: "stylesheet", href: unocss },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
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

        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
