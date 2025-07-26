import { db } from "@/db";

export async function queryApps() {
  return await db.query.projects.findMany();
}
