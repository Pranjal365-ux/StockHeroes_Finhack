import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface LearningModuleProps {
  onComplete: () => void;
}

const learningCards = [
  {
    title: 'What is a Stock?',
    content: 'A stock means owning a small part of a company.',
    color: 'from-blue-500 to-blue-600',
    icon: '🏢'
  },
  {
    title: 'Risk vs Reward',
    content: 'Higher potential returns often come with higher risks.',
    color: 'from-purple-500 to-purple-600',
    icon: '⚖️'
  },
  {
    title: 'Why Markets Move',
    content: 'Markets move based on company performance, news, and economic factors.',
    color: 'from-pink-500 to-pink-600',
    icon: '📈'
  }
];

export default function LearningModule({ onComplete }: LearningModuleProps) {
  const [currentCard, setCurrentCard] = useState(0);

  const nextCard = () => {
    if (currentCard < learningCards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      onComplete();
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const card = learningCards[currentCard];

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Avatar & Speech Bubble */}
      <div className="mb-8 mt-4">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
            👨‍🏫
          </div>
          <div className="flex-1 bg-white rounded-2xl rounded-tl-none p-4 shadow-lg">
            <p className="text-gray-800">{card.content}</p>
          </div>
        </div>
      </div>

      {/* Learning Card */}
      <div className="flex-1 flex items-center justify-center mb-8">
        <div className={`w-full max-w-md bg-gradient-to-br ${card.color} rounded-3xl p-8 shadow-2xl`}>
          <div className="text-center text-white">
            <div className="text-6xl mb-6">{card.icon}</div>
            <h2 className="text-white mb-4">{card.title}</h2>
            <p className="text-white/90 text-lg">{card.content}</p>
          </div>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mb-6">
        {learningCards.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentCard ? 'bg-white w-8' : 'bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          onClick={prevCard}
          disabled={currentCard === 0}
          className="flex-1 bg-white/20 hover:bg-white/30 text-white py-4 rounded-2xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6 mx-auto" />
        </button>
        <button
          onClick={nextCard}
          className="flex-1 bg-white hover:bg-white/90 text-purple-900 py-4 rounded-2xl transition-colors"
        >
          {currentCard === learningCards.length - 1 ? 'Continue' : <ChevronRight className="w-6 h-6 mx-auto" />}
        </button>
      </div>
    </div>
  );
}
