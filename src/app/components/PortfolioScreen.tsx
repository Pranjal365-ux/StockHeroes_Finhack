import { ArrowLeft, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { getStockById } from '../data/stockData';
import { PortfolioHolding } from '../App';

interface PortfolioScreenProps {
  onBack: () => void;
  virtualCash: number;
  portfolio: PortfolioHolding[];
}

export default function PortfolioScreen({ onBack, virtualCash, portfolio }: PortfolioScreenProps) {
  // Calculate portfolio metrics
  const holdings = portfolio.map(holding => {
    const stock = getStockById(holding.stockId);
    if (!stock) return null;
    
    const currentValue = stock.price * holding.quantity;
    const investedValue = holding.avgPrice * holding.quantity;
    const pl = currentValue - investedValue;
    const plPercent = ((stock.price - holding.avgPrice) / holding.avgPrice * 100);
    
    return {
      stockId: holding.stockId,
      name: stock.name,
      symbol: stock.symbol,
      emoji: stock.emoji,
      quantity: holding.quantity,
      avgPrice: holding.avgPrice,
      currentPrice: stock.price,
      currentValue,
      pl,
      plPercent
    };
  }).filter(Boolean);

  const totalInvestedValue = holdings.reduce((sum, h) => sum + (h!.avgPrice * h!.quantity), 0);
  const totalCurrentValue = holdings.reduce((sum, h) => sum + h!.currentValue, 0);
  const totalPortfolioValue = totalCurrentValue + virtualCash;
  const totalProfitLoss = totalCurrentValue - totalInvestedValue;
  const totalProfitPercent = totalInvestedValue > 0 ? ((totalProfitLoss / totalInvestedValue) * 100) : 0;

  // Calculate risk level based on diversification
  let riskLevel = 'Low';
  if (holdings.length === 0) {
    riskLevel = 'Low';
  } else if (holdings.length === 1) {
    riskLevel = 'High';
  } else if (holdings.length === 2) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'Low';
  }

  // Color mapping
  const colorMap: { [key: string]: string } = {
    'reliance': 'blue',
    'tcs': 'indigo',
    'infosys': 'purple',
    'hdfc': 'pink',
    'bharti': 'orange'
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
        <h1 className="text-white mb-2">Your Portfolio</h1>
        <p className="text-purple-200">Track your virtual investments</p>
      </div>

      {/* Portfolio Value */}
      <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
        <p className="text-gray-600 mb-2 text-sm">Total Portfolio Value</p>
        <h1 className="text-gray-900 mb-2">₹{totalPortfolioValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</h1>
        <div className="mb-3">
          <p className="text-gray-600 text-sm">Available Cash: ₹{virtualCash.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
          <p className="text-gray-600 text-sm">Invested: ₹{totalCurrentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
        </div>
        {totalInvestedValue > 0 && (
          <div className={`flex items-center gap-2 ${totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalProfitLoss >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            <span>
              {totalProfitLoss >= 0 ? '+' : ''}₹{Math.abs(totalProfitLoss).toLocaleString('en-IN', { maximumFractionDigits: 0 })} 
              ({totalProfitLoss >= 0 ? '+' : ''}{totalProfitPercent.toFixed(2)}%)
            </span>
          </div>
        )}
      </div>

      {holdings.length > 0 ? (
        <>
          {/* Diversification Chart */}
          <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
            <h3 className="text-gray-900 mb-4">Diversification</h3>
            <div className="flex h-8 rounded-full overflow-hidden mb-4">
              {holdings.map((stock, index) => {
                const percentage = (stock!.currentValue / totalCurrentValue) * 100;
                const color = colorMap[stock!.stockId] || 'gray';
                return (
                  <div
                    key={index}
                    className={`bg-${color}-500`}
                    style={{ width: `${percentage}%` }}
                  />
                );
              })}
            </div>
            <div className="space-y-2">
              {holdings.map((stock, index) => {
                const percentage = ((stock!.currentValue / totalCurrentValue) * 100).toFixed(1);
                const color = colorMap[stock!.stockId] || 'gray';
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-${color}-500`} />
                      <span className="text-gray-700 text-sm">{stock!.name}</span>
                    </div>
                    <span className="text-gray-600 text-sm">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Holdings */}
          <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
            <h3 className="text-gray-900 mb-4">Your Holdings</h3>
            <div className="space-y-3">
              {holdings.map((stock, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">{stock!.emoji}</div>
                    <div className="flex-1">
                      <h4 className="text-gray-900">{stock!.name}</h4>
                      <p className="text-gray-500 text-sm">Qty: {stock!.quantity} • Avg: ₹{stock!.avgPrice.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Current: ₹{stock!.currentPrice.toFixed(2)}</span>
                    <span className={stock!.pl >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {stock!.pl >= 0 ? '+' : ''}₹{Math.abs(stock!.pl).toFixed(0)} ({stock!.pl >= 0 ? '+' : ''}{stock!.plPercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Meter */}
          <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
            <h3 className="text-gray-900 mb-4">Risk Level</h3>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-3 rounded-full bg-gray-200 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    riskLevel === 'Low' ? 'bg-green-500 w-1/3' :
                    riskLevel === 'Medium' ? 'bg-yellow-500 w-2/3' :
                    'bg-red-500 w-full'
                  }`}
                />
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
            <div className="mt-3 flex items-start gap-2 text-sm text-gray-600">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                {riskLevel === 'High' && 'High risk! Consider diversifying across multiple stocks.'}
                {riskLevel === 'Medium' && 'Moderate risk. Adding more stocks can help balance your portfolio.'}
                {riskLevel === 'Low' && 'Well diversified portfolio with balanced risk.'}
              </span>
            </div>
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-6 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-gray-900 mb-2">No Holdings Yet</h3>
          <p className="text-gray-600 text-sm mb-4">
            Start trading to build your portfolio!
          </p>
          <button
            onClick={onBack}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl transition-colors"
          >
            Start Trading
          </button>
        </div>
      )}

      {/* Learning Tip */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-white mb-2">💡 Portfolio Tip</h3>
        <p className="text-orange-100 text-sm">
          {holdings.length === 0 
            ? "Diversification is key! Don't put all your eggs in one basket. Spread investments across different sectors."
            : "Review your portfolio regularly but avoid checking it too frequently. Long-term investing requires patience!"
          }
        </p>
      </div>
    </div>
  );
}
