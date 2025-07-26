import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id: string;
  name: number;
  description: string;
  ci_default_git_depth: string;
  build_timeout: string;
  creator_id: string;
};

export const columns: ColumnDef<Payment>[] = [
  { header: "应用ID", accessorKey: "id" },
  { header: "应用名称", accessorKey: "name" },
  { header: "应用描述", accessorKey: "description" },
  { header: "added lines", accessorKey: "ci_default_git_depth" },
  { header: "removed lines", accessorKey: "build_timeout" },
  { header: "total lines", accessorKey: "creator_id" },
];
