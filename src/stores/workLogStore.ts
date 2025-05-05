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

    // обновляем логи после добавления
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
}

export const workLogStore = new WorkLogStore();
