import { db } from "@/db";
import { commitsMap, sum, getName } from "./utils";
import type { FilterPrams } from "./utils";

export async function queryStatistics(filter?: FilterPrams) {
  const projects = await db.query.projects.findMany();

  const start = "2021-01-01T00:00:00Z";
  const end = "2021-12-31T23:59:59Z";

  const commits = await db.query.commits.findMany({
    where: (table, { and, gte, lte }) =>
      and(gte(table.committedDate, start), lte(table.committedDate, end)),
  });

  const total = commitsMap(commits, "pid", filter);

  let clean = projects.reduce((prev: any[], curr) => {
    // 全并
    const cp = projects.find((c) => c.name === curr.name);

    const next = {
      ...cp,
      ...total.get(curr.pid),
      name: cp?.name?.replace(/-tw$/, ""),
    };

    const index = prev.findIndex((p) => p.name === next.name);

    if (index >= 0) {
      prev[index].added += next.added || 0;
      prev[index].removed += next.removed || 0;
      prev[index].total += next.total || 0;

      return [...prev];
    }

    return [...prev, next];
  }, []);

  if (filter) {
    const { projects } = filter;
    if (projects) {
      clean = clean.filter((item) =>
        new RegExp(`^(${projects.join("|")})`).test(item.name)
      );
    }
  }

  return sum(clean);
}

const username = [
  "qhan",
  "chensijing",
  "longyancheng",
  "jie.q",
  "houtang",
  "yuanliang",
  "chengbin",
  "lixin",
  "李鑫",
  "侯唐",
  "孙凤良",
];

export async function queryUserStatistics() {
  const start = "2021-01-01T00:00:00Z";
  const end = "2021-12-31T23:59:59Z";

  const commits = await db.query.commits.findMany({
    where: (table, { and, gte, lte }) =>
      and(gte(table.committedDate, start), lte(table.committedDate, end)),
  });

  const userMaps = commitsMap(commits, "email");

  const data = [...userMaps]
    .map(([key, val]) => {
      const u = commits.find((c) => c.committerEmail === key);
      return { ...val, email: key, name: u?.authorName };
    })
    .filter((c) => new RegExp(`^${username.join("|")}`).test(c.name))
    .reduce((prev, curr) => {
      const { name: pname, added, removed, total, email } = curr;

      const name = getName(pname);

      const cu = prev.get(name);
      prev.set(name, {
        added: (cu?.added || 0) + added,
        removed: (cu?.removed || 0) + removed,
        total: (cu?.total || 0) + total,
        email: `${name}@tinman.cn`,
        name,
      });
      return prev;
    }, new Map());

  return sum([...data].map(([key, val]) => val));
}
