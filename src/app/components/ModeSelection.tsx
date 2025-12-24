import { GraduationCap, TrendingUp } from 'lucide-react';

interface ModeSelectionProps {
  onSelectMode: (mode: 'beginner' | 'intermediate') => void;
}

export default function ModeSelection({ onSelectMode }: ModeSelectionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-white mb-3">Choose Your Level</h1>
          <p className="text-purple-200">Select your experience to get started</p>
        </div>

        {/* Mode Cards */}
        <div className="space-y-4">
          {/* Beginner Card */}
          <button
            onClick={() => onSelectMode('beginner')}
            className="w-full bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-8 rounded-3xl shadow-lg transition-all hover:scale-105 active:scale-100"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-10 h-10" />
              </div>
              <div className="text-left">
                <h2 className="text-white mb-2">Beginner</h2>
                <p className="text-purple-100">New to stocks</p>
              </div>
            </div>
          </button>

          {/* Intermediate Card */}
          <button
            onClick={() => onSelectMode('intermediate')}
            className="w-full bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white p-8 rounded-3xl shadow-lg transition-all hover:scale-105 active:scale-100"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-10 h-10" />
              </div>
              <div className="text-left">
                <h2 className="text-white mb-2">Intermediate</h2>
                <p className="text-pink-100">I know the basics</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
