import { Trophy, Star, TrendingUp, TrendingUpIcon } from 'lucide-react';

interface SplashScreenProps {
  onStartLearning: () => void;
}

export default function SplashScreen({ onStartLearning }: SplashScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl">
        {/* App Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl flex items-center justify-center shadow-xl">
            <TrendingUpIcon className="w-14 h-14 text-white" />
          </div>
        </div>

        {/* App Title */}
        <h1 className="text-center mb-3 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Stock Heroes
        </h1>

        {/* Tagline */}
        <p className="text-center text-gray-600 mb-8">
          Learn stocks. Play smart. Invest confidently.
        </p>

        {/* Feature Cards */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">Gamified Learning</h3>
              <p className="text-gray-600 text-sm">Earn rewards as you master stocks</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">Beginner Friendly</h3>
              <p className="text-gray-600 text-sm">Start with zero knowledge required</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-1">Real-World Skills</h3>
              <p className="text-gray-600 text-sm">Apply what you learn immediately</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStartLearning}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl transition-colors mb-4"
        >
          Start Learning
        </button>

        {/* Footer Text */}
        <p className="text-center text-gray-500 text-sm">
          Join 10,000+ heroes learning to invest
        </p>
      </div>
    </div>
  );
}