'use client';

import { useLanguage } from "@/lib/i18n/language-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card } from "@/components/ui/card";
import {
  Award,
  Sprout,
  Zap,
  Users,
  Globe,
  TrendingUp,
  Shield,
  Leaf,
  BarChart3
} from "lucide-react";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ADVANTAGES = {
  en: [
    {
      icon: Sprout,
      title: "Premium Quality Seeds",
      description: "We provide only the highest quality seeds certified by international standards"
    },
    {
      icon: Zap,
      title: "Fast Growth Solutions",
      description: "Advanced farming techniques to accelerate crop growth and yield"
    },
    {
      icon: Users,
      title: "Expert Support Team",
      description: "Dedicated team of agricultural specialists available 24/7"
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Access to international markets and trading partners"
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Documented 35% increase in yields for our partner farms"
    },
    {
      icon: Shield,
      title: "Organic Certification",
      description: "Full organic certification for sustainable farming practices"
    },
    {
      icon: Leaf,
      title: "Environmental Care",
      description: "Eco-friendly methods that preserve soil and water resources"
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized by international agricultural organizations"
    }
  ],
  ru: [
    {
      icon: Sprout,
      title: "Семена премиум качества",
      description: "Мы предоставляем только лучшие семена, сертифицированные по международным стандартам"
    },
    {
      icon: Zap,
      title: "Быстрые решения для роста",
      description: "Продвинутые методы земледелия для ускорения роста культур и урожайности"
    },
    {
      icon: Users,
      title: "Команда экспертов",
      description: "Квалифицированная команда агрономов, готова помочь 24/7"
    },
    {
      icon: Globe,
      title: "Глобальная сеть",
      description: "Доступ к международным рынкам и торговым партнерам"
    },
    {
      icon: TrendingUp,
      title: "Доказанные результаты",
      description: "Документированный рост урожайности на 35% на фермах-партнёрах"
    },
    {
      icon: Shield,
      title: "Органическая сертификация",
      description: "Полная органическая сертификация для устойчивого земледелия"
    },
    {
      icon: Leaf,
      title: "Забота об окружающей среде",
      description: "Экологичные методы, которые сохраняют почву и водные ресурсы"
    },
    {
      icon: Award,
      title: "Награждённые лучшие",
      description: "Признаны международными сельскохозяйственными организациями"
    }
  ],
  tj: [
    {
      icon: Sprout,
      title: "Биҳидҳои сифати ҳо",
      description: "Мо танҳа биҳидҳои беҳтарин, сертификашуда аз рӯи стандартҳои байналмилалӣ пешниҳод мекунем"
    },
    {
      icon: Zap,
      title: "Ҳалҳои рӯезам",
      description: "Усулҳои пешрафтаи кишоварзӣ барои суръати рушди ҳосил ва бахшайиш"
    },
    {
      icon: Users,
      title: "Гурӯҳи мутахассисон",
      description: "Гурӯҳи оҳнае аз кишоварзон, мустаҳзаро дар ҳама вақт ёрӣ кунанд"
    },
    {
      icon: Globe,
      title: "Шабакаи ҷаҳонӣ",
      description: "Дастраси ба бозорҳои байналмилалӣ ва шарикони тиҷорӣ"
    },
    {
      icon: TrendingUp,
      title: "Натиҷаҳои исботи шудаи",
      description: "Афзойиши баҳо дар 35% дар фермаҳои шарик"
    },
    {
      icon: Shield,
      title: "Сертификатсияи органикӣ",
      description: "Пўракҳо сертификатсияи органикӣ барои кишоварзии устувор"
    },
    {
      icon: Leaf,
      title: "Ғамхӯрӣ ба мухит",
      description: "Усулҳои эколуҷӣ, ки особ ва минбаъи об нигоҳ доранд"
    },
    {
      icon: Award,
      title: "Нобелгузин беҳтарин",
      description: "Шинохташуда аз ҷониби созмонҳои сельскохозяйственные байналмилалӣ"
    }
  ]
};

export default function Catalog() {
  const { language } = useLanguage();
  const [chartType, setChartType] = useState<'chart' | 'table'>('chart');
  
  const advantages = ADVANTAGES[language as keyof typeof ADVANTAGES];

  const regionStats = {
    regions: ['Худжанд', 'Душанбе', 'Бохтар', 'Хистеварз', 'Куляб', 'Дангара', 'Исфара', 'Канибадам'],
    yield: [890, 750, 680, 620, 580, 520, 470, 420],
    activity: [95, 88, 82, 75, 70, 65, 60, 55],
    quality: [98, 90, 85, 78, 72, 68, 62, 58]
  };

  const chartData = {
    labels: regionStats.regions,
    datasets: [
      {
        label: language === 'ru' ? 'Урожайность' : language === 'tj' ? 'Бартамондиҳо' : 'Yield',
        data: regionStats.yield,
        backgroundColor: '#1a4d34',
        borderRadius: 8
      },
      {
        label: language === 'ru' ? 'Активность' : language === 'tj' ? 'Фаълият' : 'Activity',
        data: regionStats.activity,
        backgroundColor: '#2d7a52',
        borderRadius: 8
      },
      {
        label: language === 'ru' ? 'Качество' : language === 'tj' ? 'Сифат' : 'Quality',
        data: regionStats.quality,
        backgroundColor: '#3d9a66',
        borderRadius: 8
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
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  const titles = {
    en: {
      pageTitle: "Our Strengths",
      pageSubtitle: "Discover what makes us the leader in agricultural innovation and support",
      regionsTitle: "Regional Performance",
      regionsSubtitle: "Statistics by cities and regions"
    },
    ru: {
      pageTitle: "Наши достойнства",
      pageSubtitle: "Узнайте, что делает нас лидером в сельскохозяйственных инновациях и поддержке",
      regionsTitle: "Производительность регионов",
      regionsSubtitle: "Статистика по городам и регионам"
    },
    tj: {
      pageTitle: "Бартамондиҳои мо",
      pageSubtitle: "Кашф кунед, ки чӣ чизи сабб мегардонед мотеро раҳбар дар инноватсияҳо ва пуштибонии кишоварзӣ",
      regionsTitle: "Фаълияти минтаҳаҳо",
      regionsSubtitle: "Статистика аз рӯи шаҳрҳо ва минтаҳаҳо"
    }
  };

  const currentTitles = titles[language as keyof typeof titles];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a4d34] mb-4">
            {currentTitles.pageTitle}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {currentTitles.pageSubtitle}
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#1a4d34]"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#f0f4f2] flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-[#1a4d34]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1a4d34] mb-2">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Statistics Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {language === 'en' && (
            <>
              <Card className="p-6 bg-[#1a4d34] text-white text-center">
                <div className="text-4xl font-bold mb-2">5000+</div>
                <p className="text-sm">Active Farmers</p>
              </Card>
              <Card className="p-6 bg-[#2d7a52] text-white text-center">
                <div className="text-4xl font-bold mb-2">35%</div>
                <p className="text-sm">Yield Increase</p>
              </Card>
              <Card className="p-6 bg-[#3d9a66] text-white text-center">
                <div className="text-4xl font-bold mb-2">15+</div>
                <p className="text-sm">Years Experience</p>
              </Card>
              <Card className="p-6 bg-[#ffd700] text-[#1a4d34] text-center">
                <div className="text-4xl font-bold mb-2">100%</div>
                <p className="text-sm font-semibold">Satisfaction Rate</p>
              </Card>
            </>
          )}
          {language === 'ru' && (
            <>
              <Card className="p-6 bg-[#1a4d34] text-white text-center">
                <div className="text-4xl font-bold mb-2">5000+</div>
                <p className="text-sm">Активных фермеров</p>
              </Card>
              <Card className="p-6 bg-[#2d7a52] text-white text-center">
                <div className="text-4xl font-bold mb-2">35%</div>
                <p className="text-sm">Роста урожайности</p>
              </Card>
              <Card className="p-6 bg-[#3d9a66] text-white text-center">
                <div className="text-4xl font-bold mb-2">15+</div>
                <p className="text-sm">Лет опыта</p>
              </Card>
              <Card className="p-6 bg-[#ffd700] text-[#1a4d34] text-center">
                <div className="text-4xl font-bold mb-2">100%</div>
                <p className="text-sm font-semibold">Уровень удовлетворения</p>
              </Card>
            </>
          )}
          {language === 'tj' && (
            <>
              <Card className="p-6 bg-[#1a4d34] text-white text-center">
                <div className="text-4xl font-bold mb-2">5000+</div>
                <p className="text-sm">Деҳқонони фаъол</p>
              </Card>
              <Card className="p-6 bg-[#2d7a52] text-white text-center">
                <div className="text-4xl font-bold mb-2">35%</div>
                <p className="text-sm">Афзойиши ҳосил</p>
              </Card>
              <Card className="p-6 bg-[#3d9a66] text-white text-center">
                <div className="text-4xl font-bold mb-2">15+</div>
                <p className="text-sm">Соли таҷриба</p>
              </Card>
              <Card className="p-6 bg-[#ffd700] text-[#1a4d34] text-center">
                <div className="text-4xl font-bold mb-2">100%</div>
                <p className="text-sm font-semibold">Дарҷаи рӯзномадонӣ</p>
              </Card>
            </>
          )}
        </div>

        {/* Regional Performance Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BarChart3 className="w-8 h-8 text-[#1a4d34]" />
              <h2 className="text-3xl font-bold text-[#1a4d34]">
                {currentTitles.regionsTitle}
              </h2>
            </div>
            <p className="text-gray-600">
              {currentTitles.regionsSubtitle}
            </p>
          </div>

          {/* Toggle View */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setChartType('chart')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                chartType === 'chart'
                  ? 'bg-[#1a4d34] text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {language === 'ru' ? 'График' : language === 'tj' ? 'Нимад' : 'Chart'}
            </button>
            <button
              onClick={() => setChartType('table')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                chartType === 'table'
                  ? 'bg-[#1a4d34] text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {language === 'ru' ? 'Таблица' : language === 'tj' ? 'Жадвал' : 'Table'}
            </button>
          </div>

          {/* Chart View */}
          {chartType === 'chart' && (
            <Card className="p-6 mb-8">
              <div style={{ height: '400px' }}>
                <Bar data={chartData} options={chartOptions} />
              </div>
            </Card>
          )}

          {/* Table View */}
          {chartType === 'table' && (
            <Card className="p-6 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#1a4d34]">
                    <th className="px-4 py-3 text-left font-semibold text-[#1a4d34]">
                      {language === 'ru' ? 'Регион' : language === 'tj' ? 'Минтаҳа' : 'Region'}
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-[#1a4d34]">
                      {language === 'ru' ? 'Урожайность' : language === 'tj' ? 'Ҳосилдорӣ' : 'Yield'}
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-[#1a4d34]">
                      {language === 'ru' ? 'Активность' : language === 'tj' ? 'Фаълият' : 'Activity'}
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-[#1a4d34]">
                      {language === 'ru' ? 'Качество' : language === 'tj' ? 'Сифат' : 'Quality'}
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-[#1a4d34]">
                      {language === 'ru' ? 'Рейтинг' : language === 'tj' ? 'Рейтинг' : 'Rating'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {regionStats.regions.map((region, idx) => {
                    const rating = (regionStats.yield[idx] + regionStats.activity[idx] + regionStats.quality[idx]) / 3;
                    return (
                      <tr key={region} className="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td className="px-4 py-3 font-medium text-gray-800">{region}</td>
                        <td className="px-4 py-3 text-right font-semibold text-[#1a4d34]">{regionStats.yield[idx]}</td>
                        <td className="px-4 py-3 text-right text-gray-800">{regionStats.activity[idx]}%</td>
                        <td className="px-4 py-3 text-right text-gray-800">{regionStats.quality[idx]}%</td>
                        <td className="px-4 py-3 text-right">
                          <span className={`px-3 py-1 rounded-full font-semibold text-white ${
                            rating >= 85 ? 'bg-[#1a4d34]' :
                            rating >= 70 ? 'bg-[#2d7a52]' :
                            'bg-[#3d9a66]'
                          }`}>
                            {rating.toFixed(1)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          )}
        </div>
      </div>      </main>
      <Footer />    </div>
  );
}
