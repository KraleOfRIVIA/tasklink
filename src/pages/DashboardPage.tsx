import TimeRadarChart from '@/components/time/TimeRadarChart';

const DashboardPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Главная панель</h2>
      <TimeRadarChart />
    </div>
  );
};

export default DashboardPage;
