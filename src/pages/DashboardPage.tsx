import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'],
  datasets: [
    {
      label: 'Часы работы',
      data: [4, 6, 5, 7, 3],
      backgroundColor: '#6366F1',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Затраченное время по дням',
    },
  },
};

const DashboardPage = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Главная панель</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DashboardPage;
