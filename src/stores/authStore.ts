import { makeAutoObservable, runInAction } from 'mobx';
import { supabase } from '../api/supabaseClient';
import { User } from '@supabase/supabase-js';

class AuthStore {
  user: User | null = null;
  loading: boolean = true;

  constructor() {
    makeAutoObservable(this);
    this.checkSession();
  }

  async login(email: string, password: string): Promise<boolean> {
    this.loading = true;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    runInAction(() => {
      this.loading = false;
      if (error || !data.user) {
        return false;
      }
      this.user = data.user;
    });

    return !!data.user;
  }

  async logout() {
    await supabase.auth.signOut();
    runInAction(() => {
      this.user = null;
    });
  }

  async checkSession() {
    this.loading = true;
    const { data } = await supabase.auth.getSession();
    runInAction(() => {
      this.user = data.session?.user || null;
      this.loading = false;
    });
  
    // Подписка на изменение сессии
    supabase.auth.onAuthStateChange((_event, session) => {
      runInAction(() => {
        this.user = session?.user || null;
      });
    });
  }
  
  

  get isAuth() {
    return !!this.user;
  }

  get userEmail() {
    return this.user?.email || '';
  }
}

export const authStore = new AuthStore();
