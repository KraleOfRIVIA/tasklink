// stores/taskStore.ts
import { makeAutoObservable, runInAction } from "mobx";
import { supabase } from '../api/supabaseClient';
import { Task } from "@/types/ITask";

class TaskStore {
  async fetchUserTasks(userId: string) {
    this.loading = true;
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("assigned_to", userId)
      .order("deadline", { ascending: true });
  
    runInAction(() => {
      if (!error && data) {
        this.tasks = data;
      }
      this.loading = false;
    });
  }
  
  tasks: Task[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchTasksByProject(projectId: string) {
    this.loading = true;
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    runInAction(() => {
      this.loading = false;
      if (!error && data) {
        this.tasks = data;
      }
    });
  }

  async createTask(projectId: string, task: Partial<Task>) {
    const { data, error } = await supabase.from("tasks").insert({
      ...task,
      project_id: projectId,
    }).select().single();

    if (!error && data) {
      runInAction(() => {
        this.tasks.unshift(data);
      });
    }
  }

  async updateTask(taskId: string, updates: Partial<Task>) {
    const { data, error } = await supabase
      .from("tasks")
      .update(updates)
      .eq("id", taskId)
      .select()
      .single();

    if (!error && data) {
      runInAction(() => {
        const index = this.tasks.findIndex((t) => t.id === taskId);
        if (index !== -1) {
          this.tasks[index] = data;
        }
      });
    }
  }
}

export const taskStore = new TaskStore();
