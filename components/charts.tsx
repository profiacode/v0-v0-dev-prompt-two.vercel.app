"use client"

import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend)

export function BarChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  }

  const labels = ["Em análise", "Aguardando documento", "Em andamento", "Finalizado"]

  const data = {
    labels,
    datasets: [
      {
        label: "Quantidade de casos",
        data: [12, 19, 35, 27],
        backgroundColor: [
          "rgba(255, 206, 86, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  return <Bar options={options} data={data} />
}

export function LineChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  }

  const labels = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"]

  const data = {
    labels,
    datasets: [
      {
        label: "Novos casos",
        data: [12, 19, 15, 25, 22, 30],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  }

  return <Line options={options} data={data} />
}
