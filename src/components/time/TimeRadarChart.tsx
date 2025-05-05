import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const data = {
  labels: ['Задача A', 'Задача B', 'Задача C', 'Задача D', 'Задача E'],
  datasets: [
    {
      label: 'Потраченное время (часы)',
      data: [12, 5, 9, 3, 0],
      backgroundColor: 'rgba(34, 197, 94, 0.2)',
      borderColor: 'rgba(34, 197, 94, 1)',
      borderWidth: 2,
    },
  ],
}

const options = {
  responsive: true,
  scales: {
    r: {
      ticks: {
        beginAtZero: true,
        stepSize: 2,
      },
    },
  },
}

export function TimeRadarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Распределение времени по задачам</CardTitle>
      </CardHeader>
      <CardContent>
        <Radar data={data} options={options} />
      </CardContent>
    </Card>
  )
}
