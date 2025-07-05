// src/types/Task.ts
export interface Task {
    time_spent: number;
    id: string;
    project_id: string;
    title: string;
    description: string;
    assigned_to: string | null; 
    status: string;
    deadline: string;
    created_at: string;
  }
  