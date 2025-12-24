import { useState } from 'react';

interface QuizScreenProps {
  onComplete: () => void;
}

const quizData = {
  question: 'Why do stock prices usually go up?',
  options: [
    'Company grows and profits increase',
    'More people are buying stocks',
    'The economy is doing well',
    'All of the above'
  ],
  correctAnswer: 3
};

export default function QuizScreen({ onComplete }: QuizScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setIsSubmitted(true);
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Progress Bar */}
      <div className="mb-8 mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white text-sm">Question 1 of 3</span>
          <span className="text-white text-sm">33%</span>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500" />
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
          <div className="text-4xl text-center mb-6">💡</div>
          <h2 className="text-gray-900 text-center mb-2">Quick Quiz</h2>
          <p className="text-gray-800 text-center text-lg">{quizData.question}</p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {quizData.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === quizData.correctAnswer;
            const showResult = isSubmitted && isSelected;

            return (
              <button
                key={index}
                onClick={() => !isSubmitted && setSelectedAnswer(index)}
                disabled={isSubmitted}
                className={`w-full p-4 rounded-2xl text-left transition-all ${
                  showResult && isCorrect
                    ? 'bg-green-500 text-white'
                    : showResult && !isCorrect
                    ? 'bg-red-500 text-white'
                    : isSelected
                    ? 'bg-white text-purple-900 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'border-purple-600 bg-purple-600' : 'border-white/50'
                  }`}>
                    {isSelected && (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={selectedAnswer === null || isSubmitted}
        className="w-full bg-white hover:bg-white/90 text-purple-900 py-4 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitted ? 'Correct! 🎉' : 'Submit Answer'}
      </button>
    </div>
  );
}
