import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/IProject";
import { projectStore } from "@/stores/projectStore";

const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "title",
    header: "Название проекта",
    cell: ({ row }) => <div className="font-medium">{row.original.title}</div>,
  },
  {
    accessorKey: "description",
    header: "Описание",
    cell: ({ row }) => <div className="text-muted-foreground">{row.original.description}</div>,
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const status = row.original.status;
      const color =
        status === "в работе"
          ? "bg-blue-500"
          : status === "завершен"
          ? "bg-green-500"
          : "bg-yellow-500";

      return <Badge className={color + " text-white"}>{status}</Badge>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Создан",
    cell: ({ row }) =>
      new Date(row.original.created_at).toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
  },
];

const ProjectsPage = observer(() => {
  useEffect(() => {
    projectStore.fetchProjects();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Проекты</h1>
      <DataTable columns={columns} data={projectStore.projects} />
    </div>
  );
});

export default ProjectsPage;
