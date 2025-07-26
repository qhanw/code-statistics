import { pgTable, integer, varchar, text, timestamp, pgSequence } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"


export const rolesIdSeq = pgSequence("Roles_id_seq", {  startWith: "1", increment: "1", minValue: "1", maxValue: "2147483647", cache: "1", cycle: false })
export const delphiChiIdSeq = pgSequence("delphi_chi_id_seq", {  startWith: "1", increment: "1", minValue: "1", maxValue: "2147483647", cache: "1", cycle: false })
export const qtnKeySeq = pgSequence("qtn_key_seq", {  startWith: "1", increment: "1", minValue: "1", maxValue: "2147483647", cache: "1", cycle: false })

export const projects = pgTable("projects", {
	id: integer().primaryKey().notNull(),
	pid: integer().notNull(),
	name: varchar({ length: 500 }),
	description: text().notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }),
	updateAt: timestamp({ withTimezone: true, mode: 'string' }),
});

export const commits = pgTable("commits", {
	id: integer().primaryKey().generatedByDefaultAsIdentity({ name: "Commit_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647 }),
	cid: text().notNull(),
	authorEmail: text("author_email"),
	authorName: text("author_name"),
	authoredDate: timestamp("authored_date", { withTimezone: true, mode: 'string' }),
	committedDate: timestamp("committed_date", { withTimezone: true, mode: 'string' }),
	committerEmail: text("committer_email"),
	committerName: text("committer_name"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	title: text(),
	message: text(),
	projectId: integer("project_id"),
	shortId: text("short_id"),
	statsAdditions: integer("stats_additions"),
	statsDeletions: integer("stats_deletions"),
	statsTotal: integer("stats_total"),
	status: text(),
});
