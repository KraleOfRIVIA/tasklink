// components/layouts/DashboardLayout.tsx
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { authStore } from '../../../stores/authStore';
import { Button } from '@/components/ui/button';

type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const location = useLocation();

  const navLinks = [
    { to: '/dashboard', label: 'Главная' },
    { to: '/projects', label: 'Проекты' },
    { to: '/tasks', label: 'Задачи' },
    { to: '/time', label: 'Учёт времени' },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-6">TaskLink</h1>
          <nav className="space-y-2">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`block px-3 py-2 rounded-md ${
                  location.pathname === to
                    ? 'bg-blue-100 text-blue-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <Button
          variant="outline"
          onClick={() => authStore.logout()}
        >
          Выйти
        </Button>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
