export function getName(username: string) {
  switch (username) {
    case "jie.q":
      return "qiujie";
    case "qhanw":
    case "qhan":
      return "wangqihan";
    case "孙凤良":
      return "sunfenglang";
    case "侯唐":
      return "houtang";
    case "李鑫":
      return "lixin";
    case "yuanliang@tinman.cn":
      return "yuanliang";
    default:
      return username;
  }
}

export type FilterPrams = {
  email?: string[];
  projects?: string[];
};

export function commitsMap(
  commits: any[],
  dimension: string,
  filter?: FilterPrams
) {
  const total = commits.reduce((prev, curr) => {
    const {
      committer_email,
      project_id,
      stats_additions,
      stats_deletions,
      stats_total,
      author_name,
      title,
      message,
    } = curr;

    const dim = dimension === "pid" ? project_id : committer_email;

    // const reg = /^Init.*/i;
    // if (reg.test(title) || reg.test(message)) return prev;

    // 过滤掉台湾项目 sso sales
    if ([789, 792].includes(project_id)) return prev;

    if (filter) {
      const { email } = filter;
      if (email) {
        if (!new RegExp(`^${email.join("|")}`).test(committer_email))
          return prev;
      }
    }

    const cu = prev.get(dim);

    prev.set(dim, {
      added: (cu?.added || 0) + stats_additions,
      removed: (cu?.removed || 0) + stats_deletions,
      total: (cu?.total || 0) + stats_total,
    });

    return prev;
  }, new Map());

  return total;
}

export function sum(data: any[]) {
  const all = data.reduce(
    (prev, curr) => {
      prev.added += curr.added || 0;
      prev.removed += curr.removed || 0;
      prev.total += curr.total || 0;

      return prev;
    },
    { added: 0, removed: 0, total: 0 }
  );

  return [
    ...data.filter((c) => c.total),
    { name: "合计", sum: "total_commit", ...all },
  ];
}
