import { motion } from 'motion/react';

interface RewardScreenProps {
  onContinue: () => void;
}

export default function RewardScreen({ onContinue }: RewardScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Animated Coin */}
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-8"
      >
        <div className="text-9xl">💰</div>
      </motion.div>

      {/* Celebration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-white mb-4">Congratulations!</h1>
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-4">
          <p className="text-gray-600 mb-2">You earned</p>
          <h2 className="text-green-600 mb-2">₹50,000</h2>
          <p className="text-gray-600">virtual cash!</p>
        </div>
        <p className="text-purple-200 text-lg">Practice investing with zero risk.</p>
      </motion.div>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={onContinue}
        className="w-full max-w-md bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-2xl transition-all shadow-lg"
      >
        Enter Market
      </motion.button>
    </div>
  );
}
