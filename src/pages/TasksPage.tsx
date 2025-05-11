import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { taskStore } from "@/stores/taskStore";
import { authStore } from "@/stores/authStore";
import { Task } from "@/types/ITask";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Название",
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
          : status === "завершена"
          ? "bg-green-500"
          : "bg-yellow-500";

      return <Badge className={`${color} text-white`}>{status}</Badge>;
    },
  },
  {
    accessorKey: "deadline",
    header: "Дедлайн",
    cell: ({ row }) =>
      row.original.deadline
        ? format(new Date(row.original.deadline), "dd.MM.yyyy")
        : "—",
  },
];

const TasksPage = observer(() => {
  const userId = authStore.user?.id;

  useEffect(() => {
    if (userId) {
      taskStore.fetchUserTasks(userId);
    }
  }, [userId]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Мои задачи</h2>
      <DataTable columns={columns} data={taskStore.tasks} />
    </div>
  );
});

export default TasksPage;
