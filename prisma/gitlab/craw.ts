import { PrismaClient } from "@prisma/client";
import { init } from "./init";

const prisma = new PrismaClient();

// 写入本地数据库
async function write(data: any) {
  console.log("Start seeding ...");
  for (const p of data) {
    const { id, name, description, commits } = p;

    const insertProject = { pid: id, name, description };
    const proj = await prisma.projects.upsert({
      where: { pid: id },
      update: insertProject,
      create: insertProject,
    });
    console.log(`Created project with id: ${proj.id}`);

    // 写入 commit
    for (const c of commits) {
      const insertData = {
        cid: c.id,
        author_email: c.author_email,
        author_name: c.author_name,
        authored_date: c.authored_date,
        committed_date: c.committed_date,
        committer_email: c.committer_email,
        committer_name: c.committer_name,
        created_at: c.created_at,
        title: c.title,
        message: c.message,
        project_id: c.project_id,
        short_id: c.short_id,
        stats_additions: c.stats.additions,
        stats_deletions: c.stats.deletions,
        stats_total: c.stats.total,
        status: c.status || "",
      };

      const commit = await prisma.commits.upsert({
        where: { cid: c.id },
        update: insertData,
        create: insertData,
      });

      console.log(`Created commit with id: ${commit.id}`);
    }
  }

  console.log("Seeding finished.");
}

async function main() {
  // 统计
  const data = await init();

  if (!data?.length) return;

  console.log("======== Statistics ===========");

  let ct = 0;

  data.forEach((item) => {
    const len = item.commits?.length || 0;
    console.log(`Project: ${item.name} ${len} commit in total`);
    ct += len;
  });

  console.log(`A total of ${ct} commit records were crawled this time`);

  // 写入数据库
  console.log(`Start writing to the database`);

  write(data);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
