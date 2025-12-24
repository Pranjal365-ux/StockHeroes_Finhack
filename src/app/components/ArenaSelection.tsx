import { ArrowLeft, Star } from 'lucide-react';
import { arenaDatabase } from '../data/arenaData';

interface ArenaSelectionProps {
  onSelectArena: (arena: string) => void;
  onBack: () => void;
}

export default function ArenaSelection({ onSelectArena, onBack }: ArenaSelectionProps) {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="text-white mb-4 flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <h1 className="text-white mb-2">Time Arenas</h1>
        <p className="text-purple-200">Travel back in time and test your investment skills</p>
      </div>

      {/* Arena Cards */}
      <div className="grid grid-cols-1 gap-4">
        {arenaDatabase.map((arena) => (
          <button
            key={arena.id}
            onClick={() => onSelectArena(arena.id)}
            className={`bg-gradient-to-br ${arena.color} text-white p-6 rounded-3xl shadow-lg text-left hover:scale-105 transition-transform active:scale-100`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{arena.emoji}</div>
                <div>
                  <h3 className="text-white mb-1">{arena.company}</h3>
                  <p className="text-white/70">{arena.year}</p>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < arena.difficulty ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-white/20 rounded-full text-xs">
                {arena.difficulty === 1 ? 'Easy' : arena.difficulty === 2 ? 'Medium' : 'Hard'}
              </div>
              <div className="px-3 py-1 bg-white/20 rounded-full text-xs">
                Historical Scenario
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}