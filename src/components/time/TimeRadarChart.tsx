import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { workLogStore } from '@/stores/workLogStore'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function TimeBarChart() {
  const [chartData, setChartData] = useState<{ title: string; hours: number }[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await workLogStore.getRadarDataForUser() // используется тот же метод, можно переименовать
      setChartData(data)
    }

    fetchData()
  }, [])

  const labels = chartData.map((item) => item.title)
  const data = {
    labels,
    datasets: [
      {
        label: 'Потрачено часов',
        data: chartData.map((item) => item.hours),
        backgroundColor: 'rgba(34, 197, 94, 0.6)', // зеленоватый
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Потраченное время по задачам',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 1,
      },
    },
  }

  return <Bar options={options} data={data} />
}
