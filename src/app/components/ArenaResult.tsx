import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Award } from 'lucide-react';

interface ArenaResultProps {
  profit: number;
  finalValue: number;
  returnPercent: number;
  points: number;
  lesson: string;
  holdPeriod: number;
  onContinue: () => void;
}

export default function ArenaResult({ 
  profit, 
  finalValue, 
  returnPercent, 
  points, 
  lesson, 
  holdPeriod,
  onContinue 
}: ArenaResultProps) {
  const isProfit = profit >= 0;
  const holdPeriodText = holdPeriod === 0.5 ? '6 months' : holdPeriod === 1 ? '1 year' : `${holdPeriod} years`;

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="flex-1 flex flex-col items-center justify-center"
      >
        <div className="text-8xl mb-6">
          {isProfit ? '🎉' : '📉'}
        </div>
        <h1 className="text-white text-center mb-2">
          {isProfit ? 'Great Decision!' : 'Tough Times!'}
        </h1>
        <p className="text-purple-200 text-center mb-8">
          {isProfit ? 'You made a smart investment' : 'Markets can be unpredictable'}
        </p>

        {/* Results Card */}
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl mb-6">
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-2">Your Result ({holdPeriodText})</p>
            <h2 className={`mb-1 ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
              {isProfit ? '+' : ''}₹{profit.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </h2>
            <p className="text-gray-600 text-sm">
              {isProfit ? '+' : ''}{returnPercent}% return
            </p>
            <div className="mt-3 text-gray-500 text-sm">
              Final Value: ₹{finalValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </div>
          </div>

          {/* Points Earned */}
          <div className={`${isProfit ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-gray-500 to-gray-600'} text-white p-4 rounded-2xl flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6" />
              <span>Points Earned</span>
            </div>
            <span className="text-xl">+{points}</span>
          </div>
        </div>

        {/* Learning Card */}
        <div className={`w-full max-w-md ${isProfit ? 'bg-gradient-to-br from-orange-500 to-orange-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'} text-white rounded-3xl p-6 shadow-lg mb-8`}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              {isProfit ? <TrendingUp className="w-7 h-7" /> : <TrendingDown className="w-7 h-7" />}
            </div>
            <div>
              <h3 className="text-white mb-2">Lesson Learned</h3>
              <p className={`text-sm ${isProfit ? 'text-orange-100' : 'text-blue-100'}`}>
                {lesson}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Continue Button */}
      <button
        onClick={onContinue}
        className="w-full bg-white hover:bg-white/90 text-purple-900 py-4 rounded-2xl transition-colors shadow-lg"
      >
        Continue Learning
      </button>
    </div>
  );
}
