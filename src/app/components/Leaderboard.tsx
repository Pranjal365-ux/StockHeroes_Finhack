import { ArrowLeft, Trophy, Medal, Award } from 'lucide-react';

interface LeaderboardProps {
  onBack: () => void;
}

const topUsers = [
  { rank: 1, name: 'Rahul K.', points: 2850, avatar: '🦸', badge: 'Master' },
  { rank: 2, name: 'Priya S.', points: 2640, avatar: '👩‍💼', badge: 'Expert' },
  { rank: 3, name: 'Amit T.', points: 2420, avatar: '👨‍💻', badge: 'Expert' },
  { rank: 4, name: 'Sneha M.', points: 2180, avatar: '👩‍🎓', badge: 'Advanced' },
  { rank: 5, name: 'Vikram P.', points: 1950, avatar: '🧑‍💼', badge: 'Advanced' },
  { rank: 6, name: 'Anjali R.', points: 1820, avatar: '👩‍🔬', badge: 'Advanced' },
  { rank: 7, name: 'Karan D.', points: 1650, avatar: '👨‍🎓', badge: 'Intermediate' },
  { rank: 8, name: 'You', points: 450, avatar: '👤', badge: 'Beginner' }
];

export default function Leaderboard({ onBack }: LeaderboardProps) {
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
        <h1 className="text-white mb-2">Leaderboard</h1>
        <p className="text-purple-200">Compete. Learn. Grow.</p>
      </div>

      {/* Top 3 Podium */}
      <div className="mb-6">
        <div className="flex items-end justify-center gap-2 mb-4">
          {/* 2nd Place */}
          <div className="flex-1 text-center">
            <div className="bg-gradient-to-br from-gray-400 to-gray-500 text-white rounded-3xl p-4 mb-2">
              <div className="text-4xl mb-2">{topUsers[1].avatar}</div>
              <Medal className="w-8 h-8 mx-auto mb-2 text-gray-200" />
              <h4 className="text-white mb-1">{topUsers[1].name}</h4>
              <p className="text-gray-200 text-sm">{topUsers[1].points} pts</p>
            </div>
            <div className="h-16 bg-gradient-to-t from-gray-500 to-gray-400 rounded-t-xl flex items-center justify-center">
              <span className="text-white text-2xl">2</span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex-1 text-center">
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white rounded-3xl p-4 mb-2">
              <div className="text-4xl mb-2">{topUsers[0].avatar}</div>
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-200" />
              <h4 className="text-white mb-1">{topUsers[0].name}</h4>
              <p className="text-yellow-200 text-sm">{topUsers[0].points} pts</p>
            </div>
            <div className="h-24 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t-xl flex items-center justify-center">
              <span className="text-white text-2xl">1</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex-1 text-center">
            <div className="bg-gradient-to-br from-orange-400 to-orange-500 text-white rounded-3xl p-4 mb-2">
              <div className="text-4xl mb-2">{topUsers[2].avatar}</div>
              <Award className="w-8 h-8 mx-auto mb-2 text-orange-200" />
              <h4 className="text-white mb-1">{topUsers[2].name}</h4>
              <p className="text-orange-200 text-sm">{topUsers[2].points} pts</p>
            </div>
            <div className="h-12 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-xl flex items-center justify-center">
              <span className="text-white text-2xl">3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of Rankings */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-gray-900 mb-4">All Rankings</h3>
        <div className="space-y-2">
          {topUsers.map((user, index) => {
            const isCurrentUser = user.name === 'You';
            return (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  isCurrentUser 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
                  isCurrentUser ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                }`}>
                  {user.rank}
                </div>
                <div className="text-3xl">{user.avatar}</div>
                <div className="flex-1">
                  <h4 className={isCurrentUser ? 'text-white' : 'text-gray-900'}>{user.name}</h4>
                  <p className={`text-sm ${isCurrentUser ? 'text-white/80' : 'text-gray-600'}`}>
                    {user.badge}
                  </p>
                </div>
                <div className={`text-right ${isCurrentUser ? 'text-white' : 'text-gray-900'}`}>
                  <p className="font-semibold">{user.points}</p>
                  <p className={`text-xs ${isCurrentUser ? 'text-white/80' : 'text-gray-500'}`}>points</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivation Card */}
      <div className="mt-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-white mb-2">🎯 Keep Going!</h3>
        <p className="text-orange-100 text-sm">
          Complete more challenges and quizzes to climb the leaderboard. 
          You're just {topUsers[6].points - topUsers[7].points} points away from the next rank!
        </p>
      </div>
    </div>
  );
}
