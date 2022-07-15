import {
  getApps,
  getAppsBranch,
  getAppsCommits,
  getCommitStatistics,
} from "./gitlab-services";

function mergeBranch(apps: any[]) {
  return {
    [Symbol.asyncIterator]: async function* () {
      let i = 0;
      const len = apps.length;
      while (i < len) {
        const curr = apps[i];
        const b = await getAppsBranch(curr.id);

        console.log(`Fetched branch of app: ${curr.name}`);

        yield { value: { ...curr, branches: b }, done: i !== len };
        i += 1;
      }
    },
  };
}

type AppParams = {
  id: number;
  name: string;
  description: string;
  branches: any[];
  commits?: any[];
};

function mergeCommitIds(app: AppParams) {
  const { id: projectId, branches, name } = app;
  return {
    [Symbol.asyncIterator]: async function* () {
      let i = 0;
      const len = branches.length;
      while (i < len) {
        const curr = branches[i];
        const b = await getAppsCommits({
          projectId,
          branch: curr.name,
          since: "2021-01-01 00:00:00",
          until: "2021-12-31 23:59:59",
        });

        console.log(`Fetched project: ${name} branch: ${curr.name}`);

        yield { value: b, done: i !== len };
        i += 1;
      }
    },
  };
}

function mergeCommits(projectId: number, commits: string[]) {
  return {
    [Symbol.asyncIterator]: async function* () {
      let i = 0;
      const len = commits.length;
      while (i < len) {
        const curr = commits[i];
        const b = await getCommitStatistics(projectId, curr);

        console.log(`Fetched commit details : ${i + 1}`);

        yield { value: b, done: i !== len };
        i += 1;
      }
    },
  };
}

// 同步数据到本地
export async function init() {
  const apps = await getApps();

  if (!(apps && apps.length)) {
    console.log("当前用户无项目");
    return;
  }

  let data: AppParams[] = [];

  for await (let { value: app } of mergeBranch(apps)) {
    // 获取全部commit ids
    let commitIds: any[] = [];
    for await (let { value: vc } of mergeCommitIds(app)) {
      commitIds = [...new Set([...commitIds, ...(vc || [])])];
    }

    // 获取全部 commit 详情
    let commits: any[] = [];
    for await (let { value } of mergeCommits(app.id, commitIds)) {
      commits = [...commits, value];
    }

    data = [...data, { ...app, commitIds, commits }];

    // 每个请求间等待 2 秒
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return data;
}
