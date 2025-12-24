import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import ModeSelection from './components/ModeSelection';
import LearningModule from './components/LearningModule';
import QuizScreen from './components/QuizScreen';
import RewardScreen from './components/RewardScreen';
import Dashboard from './components/Dashboard';
import ArenaSelection from './components/ArenaSelection';
import ArenaDecision from './components/ArenaDecision';
import ArenaResult from './components/ArenaResult';
import VirtualTrading from './components/VirtualTrading';
import PortfolioScreen from './components/PortfolioScreen';
import Leaderboard from './components/Leaderboard';
import { calculateArenaResult } from './data/arenaData';

type Screen = 
  | 'splash'
  | 'mode-selection'
  | 'learning'
  | 'quiz'
  | 'reward'
  | 'dashboard'
  | 'arena'
  | 'arena-decision'
  | 'arena-result'
  | 'trading'
  | 'portfolio'
  | 'leaderboard';

interface ArenaResultData {
  profit: number;
  finalValue: number;
  returnPercent: number;
  points: number;
  lesson: string;
  holdPeriod: number;
}

export interface PortfolioHolding {
  stockId: string;
  quantity: number;
  avgPrice: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedArena, setSelectedArena] = useState<string>('apple-2012');
  const [arenaResultData, setArenaResultData] = useState<ArenaResultData | null>(null);
  const [virtualCash, setVirtualCash] = useState<number>(50000); // Starting with ₹50,000
  const [portfolio, setPortfolio] = useState<PortfolioHolding[]>([]);

  const handleBuyStock = (stockId: string, quantity: number, price: number) => {
    const totalCost = quantity * price;
    
    if (totalCost > virtualCash) {
      return { success: false, message: 'Insufficient funds!' };
    }

    setVirtualCash(prev => prev - totalCost);
    
    setPortfolio(prev => {
      const existingHolding = prev.find(h => h.stockId === stockId);
      
      if (existingHolding) {
        // Update average price
        const totalQuantity = existingHolding.quantity + quantity;
        const totalValue = (existingHolding.avgPrice * existingHolding.quantity) + (price * quantity);
        const newAvgPrice = totalValue / totalQuantity;
        
        return prev.map(h => 
          h.stockId === stockId 
            ? { ...h, quantity: totalQuantity, avgPrice: newAvgPrice }
            : h
        );
      } else {
        // Add new holding
        return [...prev, { stockId, quantity, avgPrice: price }];
      }
    });

    return { success: true, message: `Successfully bought ${quantity} shares!` };
  };

  const handleSellStock = (stockId: string, quantity: number, price: number) => {
    const holding = portfolio.find(h => h.stockId === stockId);
    
    if (!holding || holding.quantity < quantity) {
      return { success: false, message: 'Insufficient shares to sell!' };
    }

    const totalValue = quantity * price;
    setVirtualCash(prev => prev + totalValue);
    
    setPortfolio(prev => {
      return prev.map(h => 
        h.stockId === stockId 
          ? { ...h, quantity: h.quantity - quantity }
          : h
      ).filter(h => h.quantity > 0);
    });

    return { success: true, message: `Successfully sold ${quantity} shares!` };
  };

  const handleArenaSubmit = (investment: number, holdPeriod: number, confidence: number) => {
    const result = calculateArenaResult(selectedArena, investment, holdPeriod, confidence);
    setArenaResultData({
      profit: result.profit,
      finalValue: result.finalValue,
      returnPercent: result.returnPercent,
      points: result.points,
      lesson: result.lesson,
      holdPeriod: holdPeriod
    });
    setCurrentScreen('arena-result');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onStartLearning={() => setCurrentScreen('mode-selection')} />;
      
      case 'mode-selection':
        return <ModeSelection onSelectMode={() => setCurrentScreen('learning')} />;
      
      case 'learning':
        return <LearningModule onComplete={() => setCurrentScreen('quiz')} />;
      
      case 'quiz':
        return <QuizScreen onComplete={() => setCurrentScreen('reward')} />;
      
      case 'reward':
        return <RewardScreen onContinue={() => setCurrentScreen('dashboard')} />;
      
      case 'dashboard':
        return <Dashboard onNavigate={(screen) => {
          if (screen === 'arena') setCurrentScreen('arena');
          else if (screen === 'trading') setCurrentScreen('trading');
          else if (screen === 'portfolio') setCurrentScreen('portfolio');
        }} />;
      
      case 'arena':
        return (
          <ArenaSelection
            onSelectArena={(arenaId) => {
              setSelectedArena(arenaId);
              setCurrentScreen('arena-decision');
            }}
            onBack={() => setCurrentScreen('dashboard')}
          />
        );
      
      case 'arena-decision':
        return (
          <ArenaDecision
            arenaId={selectedArena}
            onSubmit={handleArenaSubmit}
            onBack={() => setCurrentScreen('arena')}
          />
        );
      
      case 'arena-result':
        return arenaResultData ? (
          <ArenaResult
            profit={arenaResultData.profit}
            finalValue={arenaResultData.finalValue}
            returnPercent={arenaResultData.returnPercent}
            points={arenaResultData.points}
            lesson={arenaResultData.lesson}
            holdPeriod={arenaResultData.holdPeriod}
            onContinue={() => setCurrentScreen('dashboard')}
          />
        ) : null;
      
      case 'trading':
        return (
          <VirtualTrading 
            onBack={() => setCurrentScreen('dashboard')}
            virtualCash={virtualCash}
            portfolio={portfolio}
            onBuyStock={handleBuyStock}
            onSellStock={handleSellStock}
          />
        );
      
      case 'portfolio':
        return (
          <PortfolioScreen 
            onBack={() => setCurrentScreen('dashboard')}
            virtualCash={virtualCash}
            portfolio={portfolio}
          />
        );
      
      case 'leaderboard':
        return <Leaderboard onBack={() => setCurrentScreen('dashboard')} />;
      
      default:
        return <SplashScreen onStartLearning={() => setCurrentScreen('mode-selection')} />;
    }
  };

  return (
    <div className="size-full">
      {renderScreen()}
    </div>
  );
}