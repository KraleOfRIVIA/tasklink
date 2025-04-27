// stores/projectStore.ts
import { makeAutoObservable, runInAction } from 'mobx';
import { supabase } from '../api/supabaseClient';
import { Project } from '@/types/IProject';

class ProjectStore {
  projects: Project[] = [];
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchProjects() {
    this.loading = true;
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });

    runInAction(() => {
      if (!error && data) {
        this.projects = data;
      }
      this.loading = false;
    });
  }

  getProjectById(id: string) {
    return this.projects.find(p => p.id === id);
  }
}

export const projectStore = new ProjectStore();
