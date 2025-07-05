import { makeAutoObservable, runInAction } from "mobx";
import { supabase } from "@/api/supabaseClient";
import { authStore } from "./authStore";

interface WorkLog {
  id: string;
  user_id: string;
  task_id: string;
  hours: number;
  date: string;
  created_at: string;
}

class WorkLogStore {
  logs: WorkLog[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async addLog(taskId: string, hours: number) {
    const userId = authStore.user?.id;
    if (!userId) return;

    const { error } = await supabase.from("work_logs").insert([
      {
        user_id: userId,
        task_id: taskId,
        hours,
        date: new Date().toISOString().split("T")[0],
      },
    ]);

    if (error) {
      console.error("Ошибка при добавлении work log:", error.message);
      return;
    }

    await this.fetchLogsByUser(userId);
  }

  async fetchLogsByUser(userId: string) {
    this.loading = true;
    const { data, error } = await supabase
      .from("work_logs")
      .select("*")
      .eq("user_id", userId);

    runInAction(() => {
      if (!error && data) {
        this.logs = data;
      }
      this.loading = false;
    });
  }

  getTotalHoursForTask(taskId: string): number {
    return this.logs
      .filter((log) => log.task_id === taskId)
      .reduce((sum, log) => sum + log.hours, 0);
  }
  async getRadarDataForUser(): Promise<{ title: string; hours: number }[]> {
    const userId = authStore.user?.id;
    if (!userId) return [];
  
    const { data: logs, error: logsError } = await supabase
      .from("work_logs")
      .select("task_id, hours")
      .eq("user_id", userId);
  
    if (logsError || !logs) {
      console.error("Ошибка при получении work_logs:", logsError?.message);
      return [];
    }
  
    const taskIds = [...new Set(logs.map((log) => log.task_id))];
  
    if (taskIds.length === 0) return [];
  
    const { data: tasks, error: tasksError } = await supabase
      .from("tasks")
      .select("id, title, assigned_to")
      .in("id", taskIds);
  
    if (tasksError || !tasks) {
      console.error("Ошибка при получении задач:", tasksError?.message);
      return [];
    }
  
    const titleMap: Record<string, number> = {};
  
    for (const log of logs) {
      const task = tasks.find((t) => t.id === log.task_id);
      if (task && task.assigned_to === userId) {
        titleMap[task.title] = (titleMap[task.title] || 0) + log.hours;
      }
    }
  
    return Object.entries(titleMap).map(([title, hours]) => ({ title, hours }));
  }
  
}

export const workLogStore = new WorkLogStore();
