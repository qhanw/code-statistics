"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id: string;
  name: number;
  added: number;
  removed: number;
  total: number;
};

export const column: ColumnDef<Payment>[] = [
  {
    header: "序号",
    accessorKey: "id",
    cell: ({ row }) => row.index + 1,
  },
  // { header: "应用ID", accessorKey: "pid" },
  { header: "应用名称", accessorKey: "name" },
  // { header: "应用描述", accessorKey: "description" },

  {
    header: "新增",
    accessorKey: "added",
    cell: ({ getValue }) => (
      <span className="text-green-500">{getValue<string>()}</span>
    ),
  },
  {
    header: "删除",
    accessorKey: "removed",
    cell: ({ getValue }) => (
      <span className="text-red-500">{getValue<string>()}</span>
    ),
  },
  {
    header: "共计",
    accessorKey: "total",
    cell: ({ getValue }) => (
      <span className="text-yellow-500">{getValue<string>()}</span>
    ),
  },
];
