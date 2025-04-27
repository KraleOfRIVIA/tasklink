export type Project = {
    id: string;
    title: string;
    description: string;
    status: "в работе" | "завершен" | "на паузе";
    created_at: string;
  };