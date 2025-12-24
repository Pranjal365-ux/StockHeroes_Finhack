import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getArenaById } from '../data/arenaData';

interface ArenaDecisionProps {
  arenaId: string;
  onSubmit: (investment: number, holdPeriod: number, confidence: number) => void;
  onBack: () => void;
}

export default function ArenaDecision({ arenaId, onSubmit, onBack }: ArenaDecisionProps) {
  const [investment, setInvestment] = useState(3000);
  const [holdPeriod, setHoldPeriod] = useState(2);
  const [confidence, setConfidence] = useState(3);

  const arena = getArenaById(arenaId);
  if (!arena) return null;

  const handleSubmit = () => {
    onSubmit(investment, holdPeriod, confidence);
  };

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
        <h1 className="text-white mb-2">Time Arena: {arena.company} – {arena.year}</h1>
        <p className="text-purple-200">
          {arena.company === 'Apple' && "It's 2012. Apple just launched the iPhone 5..."}
          {arena.company === 'Tesla' && "It's 2016. Tesla is ramping up Model 3 production..."}
          {arena.company === 'Infosys' && "It's 2008. The global financial crisis is unfolding..."}
          {arena.company === 'Amazon' && "It's 2010. E-commerce is growing but still uncertain..."}
          {arena.company === 'Google' && "It's 2014. Mobile advertising is becoming dominant..."}
        </p>
      </div>

      {/* Scenario Card */}
      <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
        <div className="text-4xl text-center mb-4">{arena.emoji}</div>
        <h3 className="text-gray-900 text-center mb-2">The Scenario</h3>
        <p className="text-gray-600 text-center text-sm">
          {arena.company === 'Apple' && `Apple's stock is at $${arena.startPrice}. The iPhone 5 just launched to mixed reviews. Competitors are catching up. What's your move?`}
          {arena.company === 'Tesla' && `Tesla's stock is at $${arena.startPrice}. Production challenges ahead. Many doubt electric vehicles. What's your move?`}
          {arena.company === 'Infosys' && `Infosys stock is at ₹${arena.startPrice}. Markets are crashing globally. Banks are failing. What's your move?`}
          {arena.company === 'Amazon' && `Amazon's stock is at $${arena.startPrice}. Retail is moving online but profitability is uncertain. What's your move?`}
          {arena.company === 'Google' && `Google's stock is at $${arena.startPrice}. Dominating search, expanding into mobile. What's your move?`}
        </p>
      </div>

      {/* Decision Form */}
      <div className="space-y-6 mb-8">
        {/* Investment Amount */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white">How much would you invest?</h3>
            <span className="text-white">₹{investment.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="1000"
            max="10000"
            step="500"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <div className="flex justify-between text-purple-200 text-xs mt-2">
            <span>₹1,000</span>
            <span>₹10,000</span>
          </div>
        </div>

        {/* Hold Period */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6">
          <h3 className="text-white mb-4">How long would you hold?</h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: '6M', value: 0.5 },
              { label: '1Y', value: 1 },
              { label: '2Y', value: 2 },
              { label: '5Y', value: 5 }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setHoldPeriod(option.value)}
                className={`py-3 rounded-2xl transition-all ${
                  holdPeriod === option.value
                    ? 'bg-white text-purple-900'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Confidence Level */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6">
          <h3 className="text-white mb-4">How confident are you?</h3>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => setConfidence(level)}
                className={`py-3 rounded-2xl transition-all ${
                  confidence === level
                    ? 'bg-white text-purple-900'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {level === 1 ? '😰' : level === 2 ? '😐' : level === 3 ? '😊' : level === 4 ? '😎' : '🚀'}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-purple-200 text-xs mt-2">
            <span>Not sure</span>
            <span>Very confident</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-white hover:bg-white/90 text-purple-900 py-4 rounded-2xl transition-colors shadow-lg"
      >
        Lock My Decision
      </button>
    </div>
  );
}