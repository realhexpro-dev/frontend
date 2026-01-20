'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card } from '@/components/ui/card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const REGIONS = ['Худжанд', 'Душанбе', 'Бохтар', 'Хистеварз', 'Куляб', 'Дангара', 'Исфара', 'Канибадам'];

const CROPS_DATA = {
  'Пшеница': [450, 520, 380, 290, 410, 360, 310, 280],
  'Яблоки': [320, 280, 410, 350, 300, 280, 290, 260],
  'Помидоры': [280, 350, 290, 400, 320, 310, 380, 340],
  'Картофель': [520, 480, 450, 380, 500, 420, 410, 390],
  'Хлопок': [650, 580, 520, 480, 510, 490, 460, 440],
  'Виноград': [380, 420, 350, 310, 360, 390, 340, 320]
};

const COLORS = [
  '#1a4d34',
  '#2d7a52',
  '#3d9a66',
  '#4db877',
  '#ffd700',
  '#ffdd33'
];

export default function Statistics() {
  const [selectedCrop, setSelectedCrop] = useState<string>('Пшеница');
  const crops = Object.keys(CROPS_DATA);
  const currentData = CROPS_DATA[selectedCrop as keyof typeof CROPS_DATA];

  // Расчет топ регионов
  const topRegions = REGIONS.map((region, idx) => ({
    region,
    value: currentData[idx]
  }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const chartData = {
    labels: REGIONS,
    datasets: [
      {
        label: `Сбор ${selectedCrop} (тонн)`,
        data: currentData,
        backgroundColor: '#1a4d34',
        borderColor: '#1a4d34',
        borderRadius: 8,
        borderSkipped: false
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const
      },
      title: {
        display: true,
        text: `Статистика сбора: ${selectedCrop}`
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Тонны'
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 text-[#1a4d34]">
          Статистика сбора ресурсов
        </h1>
        <p className="text-gray-600 mb-8">
          Аналитика по сбору урожая в регионах республики
        </p>

        {/* Выбор культуры */}
        <Card className="mb-8 p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#1a4d34]">
            Выберите культуру:
          </h2>
          <div className="flex flex-wrap gap-3">
            {crops.map((crop) => (
              <button
                key={crop}
                onClick={() => setSelectedCrop(crop)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedCrop === crop
                    ? 'bg-[#1a4d34] text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {crop}
              </button>
            ))}
          </div>
        </Card>

        {/* Графики */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Основной график */}
          <Card className="lg:col-span-2 p-6">
            <div style={{ height: '400px' }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </Card>

          {/* Топ регионов */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#1a4d34]">
              🏆 Топ регионов
            </h3>
            <div className="space-y-3">
              {topRegions.map((item, idx) => (
                <div
                  key={item.region}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-[#ffd700]">
                      #{idx + 1}
                    </span>
                    <span className="font-medium text-gray-800">
                      {item.region}
                    </span>
                  </div>
                  <span className="font-bold text-[#1a4d34]">
                    {item.value} т
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Таблица всех регионов */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-[#1a4d34]">
            Полная таблица: {selectedCrop}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#1a4d34]">
                  <th className="px-4 py-3 text-left font-semibold text-[#1a4d34]">
                    Регион
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-[#1a4d34]">
                    Сбор (тонн)
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-[#1a4d34]">
                    % от максимума
                  </th>
                </tr>
              </thead>
              <tbody>
                {REGIONS.map((region, idx) => {
                  const value = currentData[idx];
                  const maxValue = Math.max(...currentData);
                  const percentage = ((value / maxValue) * 100).toFixed(1);

                  return (
                    <tr
                      key={region}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {region}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-[#1a4d34]">
                        {value} т
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center">
                          <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-[#1a4d34] h-2 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700 w-12 text-right">
                            {percentage}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
