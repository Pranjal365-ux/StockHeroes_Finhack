import { TrendingUp, Clock, Briefcase, Lightbulb, ArrowRight } from 'lucide-react';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white mb-1">Welcome back!</h2>
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm">
              <span>⭐</span>
              <span>Beginner Investor</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <p className="text-gray-600 mb-1 text-sm">Virtual Balance</p>
          <h1 className="text-gray-900 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">₹50,000</h1>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        <button
          onClick={() => onNavigate('trading')}
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-3xl shadow-lg text-left hover:scale-105 transition-transform active:scale-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-3">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-white mb-1">Trade Live</h3>
              <p className="text-blue-100 text-sm">Practice with real market data</p>
            </div>
            <ArrowRight className="w-6 h-6 opacity-50" />
          </div>
        </button>

        <button
          onClick={() => onNavigate('arena')}
          className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-3xl shadow-lg text-left hover:scale-105 transition-transform active:scale-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-3">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-white mb-1">Time Arenas</h3>
              <p className="text-purple-100 text-sm">Travel back and make decisions</p>
            </div>
            <ArrowRight className="w-6 h-6 opacity-50" />
          </div>
        </button>

        <button
          onClick={() => onNavigate('portfolio')}
          className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-3xl shadow-lg text-left hover:scale-105 transition-transform active:scale-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-3">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-white mb-1">Portfolio</h3>
              <p className="text-pink-100 text-sm">Track your investments</p>
            </div>
            <ArrowRight className="w-6 h-6 opacity-50" />
          </div>
        </button>
      </div>

      {/* Daily Tip */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-3xl shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-white mb-2">Daily Learning Tip</h3>
            <p className="text-orange-100 text-sm">
              Diversification helps reduce risk. Don't put all your eggs in one basket!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
