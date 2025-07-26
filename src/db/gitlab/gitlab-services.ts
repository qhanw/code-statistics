import qs from "query-string";

const domain = "https://git.xjjj.co/api/v4";
const private_token = "Ppqznv_Nw-TtMAUFzhV2";

const own = [
  // "bs-ds",
  // "call-center",
  // "crm",
  // "effe",
  "fabric",
  // "luban",
  // "message-center",
  // "monitor",
  // "mp-",
  // "oagw",
  // "sales",
  // "sso",
  // "surprise",
  // "ticket",
  // "ugc",
  // "umi-plugin",
  // "uploader",
  // "woulsl-cli",
];

async function fetchApps({ limit: per_page, page }: any) {
  const data: any = await fetch(
    qs.stringifyUrl({
      url: `${domain}/projects`,
      query: {
        private_token,
        membership: true,
        page,
        per_page,
        sort: "asc",
        order_by: "name",
        // last_activity_after: "2021-01-01 00:00:00",
        // last_activity_before: "2021-12-31 23:59:59",
      },
    })
  ).then((res) => res.json());

  // 过滤其它数据
  const nextData = data.reduce((prev: any, curr: any) => {
    if (new RegExp(`^(${own.join("|")})`).test(curr.name)) {
      const { id, name, description } = curr;
      return [...prev, { id, name, description }];
    }

    return prev;
  }, []);

  return { value: nextData, done: data?.length !== per_page };
}

function apps() {
  // 获取当前用户所有项目
  return {
    [Symbol.asyncIterator]: async function* () {
      const limit = 100;
      let page = 1;
      let hasNext = true;
      while (hasNext) {
        const cats = await fetchApps({ page, limit });
        console.log(`Fetched the ${page} page of project`);
        yield cats;
        if (cats.done) {
          hasNext = false;
        } else {
          page += 1;
        }
      }
    },
  };
}

// 获取当前用户所有项目
export async function getApps() {
  try {
    let data: any[] = [];
    for await (let { value } of apps()) {
      data = [...data, ...value];

      // 每个请求间等待 7 秒
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}

// ------------------------------------------------
// 获取每个项目分支
async function fetchBranch({ limit: per_page, page, projectId }: any) {
  const data: any = await fetch(
    qs.stringifyUrl({
      url: `${domain}/projects/${projectId}/repository/branches`,
      query: { private_token, page, per_page },
    })
  ).then((res) => res.json());

  return { value: data, done: data?.length !== per_page };
}

function branch({ projectId }: any) {
  return {
    [Symbol.asyncIterator]: async function* () {
      const limit = 100;
      let page = 1;
      let hasNext = true;
      while (hasNext) {
        const cats = await fetchBranch({ page, limit, projectId });
        console.log(`Fetched the ${page} page of branch`);

        yield cats;
        if (cats.done) {
          hasNext = false;
        } else {
          page += 1;
        }
      }
    },
  };
}

export async function getAppsBranch(projectId: number) {
  try {
    let data: any[] = [];
    for await (let { value } of branch({ projectId })) {
      data = [...data, ...value];

      // 每个请求间等待 2 秒
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // 过滤掉已 merge 的分支
    return data.filter((c) => !c.merged);
  } catch (error) {
    console.log(error);
  }
}

// ------------------------------
// 获取第个分支的commit
async function fetchProjectCommit({
  limit: per_page,
  page,
  projectId,
  branch,
  ...params
}: any) {
  const data: any = await fetch(
    qs.stringifyUrl({
      url: `${domain}/projects/${projectId}/repository/commits`,
      query: {
        private_token,
        ref_name: branch,
        page,
        per_page,
        ...params,
      },
    })
  ).then((res) => res.json());

  return { value: data, done: data?.length !== per_page };
}

type RequestCommitParams = {
  projectId: number;
  branch: string;
  since: string;
  until: string;
};

function commits(params: RequestCommitParams) {
  return {
    [Symbol.asyncIterator]: async function* () {
      const limit = 100;
      let page = 1;
      let hasNext = true;
      while (hasNext) {
        const cats = await fetchProjectCommit({ page, limit, ...params });
        console.log(`Fetched the ${page} page of commit`);
        yield cats;
        if (cats.done) {
          hasNext = false;
        } else {
          page += 1;
        }
      }
    },
  };
}

export async function getAppsCommits(params: RequestCommitParams) {
  try {
    let data: any[] = [];
    for await (let { value } of commits(params)) {
      data = [...data, ...value];

      // 每个请求间等待 2 秒
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // GitLab 上的项目分支中的 commits，当 title 或 message 首单词为 Merge 时，表示合并操作，剔除此代码量
    // 同时只保留 commit id
    const reg = /^Merge.*/i;
    return data.reduce((prev, c) => {
      if (!(reg.test(c.title) || reg.test(c.message))) return [...prev, c.id];
      return prev;
    }, []);
  } catch (error) {
    console.log(error);
  }
}

// -----------------------
// 获取提交统计
export async function getCommitStatistics(projectId: number, commitId: string) {
  const data = await fetch(
    qs.stringifyUrl({
      url: `${domain}/projects/${projectId}/repository/commits/${commitId}`,
      query: { private_token },
    })
  ).then((res) => res.json());

  return data;
}
