import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { taskStore } from "@/stores/taskStore";
import { authStore } from "@/stores/authStore";
import { workLogStore } from "@/stores/workLogStore";
import AddTimeDrawer from "@/components/time/AddTimeDrawer";
import { format } from "date-fns";

const TimeTrackingPage = observer(() => {
  const userId = authStore.user?.id;

  useEffect(() => {
    if (userId) {
      taskStore.fetchUserTasks(userId);
      workLogStore.fetchLogsByUser(userId);
    }
  }, [userId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Мои задачи</h1>

      {taskStore.loading ? (
        <p>Загрузка задач...</p>
      ) : taskStore.tasks.length === 0 ? (
        <p>Нет назначенных задач</p>
      ) : (
        <div className="space-y-4">
          {taskStore.tasks.map((task) => (
            <div
              key={task.id}
              className="border rounded-xl p-4 shadow-sm bg-white flex flex-col md:flex-row md:items-center justify-between gap-2"
            >
              <div>
                <h2 className="text-lg font-semibold">{task.title}</h2>
                <p className="text-sm text-muted-foreground mb-1">
                  Дедлайн:{" "}
                  {task.deadline
                    ? format(new Date(task.deadline), "dd.MM.yyyy")
                    : "Не указан"}
                </p>
                <p className="text-xs text-gray-500">
                  Затрачено: {workLogStore.getTotalHoursForTask(task.id).toFixed(2)} ч.
                </p>
              </div>

              <AddTimeDrawer
                task={task}
                onSubmit={(hours) => {
                  workLogStore.addLog(task.id, hours);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default TimeTrackingPage;
