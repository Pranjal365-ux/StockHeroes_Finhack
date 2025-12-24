import { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { availableStocks, getStockById } from '../data/stockData';
import { PortfolioHolding } from '../App';

interface VirtualTradingProps {
  onBack: () => void;
  virtualCash: number;
  portfolio: PortfolioHolding[];
  onBuyStock: (stockId: string, quantity: number, price: number) => { success: boolean; message: string };
  onSellStock: (stockId: string, quantity: number, price: number) => { success: boolean; message: string };
}

export default function VirtualTrading({ onBack, virtualCash, portfolio, onBuyStock, onSellStock }: VirtualTradingProps) {
  const [selectedStockId, setSelectedStockId] = useState(availableStocks[0].id);
  const [quantity, setQuantity] = useState(1);
  const [showStockList, setShowStockList] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const selectedStock = getStockById(selectedStockId);
  if (!selectedStock) return null;

  const holding = portfolio.find(h => h.stockId === selectedStockId);
  const maxSellQuantity = holding?.quantity || 0;

  // Simple mock chart data
  const chartData = [45, 52, 48, 65, 70, 68, 75, 80, 78, 85, 90, 88, 95, 100];

  const handleBuy = () => {
    const result = onBuyStock(selectedStockId, quantity, selectedStock.price);
    setMessage({ text: result.message, type: result.success ? 'success' : 'error' });
    if (result.success) {
      setQuantity(1);
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSell = () => {
    const result = onSellStock(selectedStockId, quantity, selectedStock.price);
    setMessage({ text: result.message, type: result.success ? 'success' : 'error' });
    if (result.success) {
      setQuantity(1);
    }
    setTimeout(() => setMessage(null), 3000);
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
        <div className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm inline-flex items-center gap-2 mb-3">
          <span>⚡</span>
          <span>Virtual Market – Practice Mode</span>
        </div>
        <div className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-2xl inline-block">
          <span className="text-purple-200 text-sm">Available Cash: </span>
          <span className="text-xl">₹{virtualCash.toLocaleString()}</span>
        </div>
      </div>

      {/* Message Toast */}
      {message && (
        <div className={`mb-4 p-4 rounded-2xl ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {message.text}
        </div>
      )}

      {/* Stock Selector */}
      <div className="bg-white rounded-3xl p-4 shadow-lg mb-6">
        <button
          onClick={() => setShowStockList(!showStockList)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="text-3xl">{selectedStock.emoji}</div>
            <div className="text-left">
              <h3 className="text-gray-900">{selectedStock.name}</h3>
              <p className="text-gray-500 text-sm">{selectedStock.symbol}</p>
            </div>
          </div>
          <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${showStockList ? 'rotate-90' : ''}`} />
        </button>
        
        {showStockList && (
          <div className="mt-4 space-y-2 border-t pt-4">
            {availableStocks.map(stock => (
              <button
                key={stock.id}
                onClick={() => {
                  setSelectedStockId(stock.id);
                  setShowStockList(false);
                  setQuantity(1);
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  stock.id === selectedStockId ? 'bg-purple-100' : 'hover:bg-gray-100'
                }`}
              >
                <div className="text-2xl">{stock.emoji}</div>
                <div className="flex-1 text-left">
                  <h4 className="text-gray-900 text-sm">{stock.name}</h4>
                  <p className="text-gray-500 text-xs">{stock.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 text-sm">₹{stock.price.toFixed(2)}</p>
                  <p className={`text-xs ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Stock Info */}
      <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
        <div className="flex items-end gap-2 mb-1">
          <span className="text-gray-900 text-3xl">₹{selectedStock.price.toFixed(2)}</span>
          <div className={`flex items-center gap-1 ${selectedStock.changePercent > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {selectedStock.changePercent > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-sm">{selectedStock.changePercent > 0 ? '+' : ''}{selectedStock.changePercent}%</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm">Today</p>
        
        {holding && holding.quantity > 0 && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-gray-600 text-sm">You own: <span className="text-purple-600 font-medium">{holding.quantity} shares</span></p>
            <p className="text-gray-600 text-sm">Avg. price: ₹{holding.avgPrice.toFixed(2)}</p>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
        <h3 className="text-gray-900 mb-4">Price Chart</h3>
        <div className="h-40 flex items-end gap-1">
          {chartData.map((value, index) => (
            <div
              key={index}
              className="flex-1 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t"
              style={{ height: `${value}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between text-gray-500 text-xs mt-2">
          <span>9:30 AM</span>
          <span>3:30 PM</span>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-6">
        <h3 className="text-white mb-4">Quantity</h3>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-colors"
          >
            -
          </button>
          <span className="text-white text-2xl">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-colors"
          >
            +
          </button>
        </div>
        <div className="bg-white/10 rounded-2xl p-4 text-center">
          <p className="text-purple-200 text-sm mb-1">Total Value</p>
          <p className="text-white text-xl">₹{(selectedStock.price * quantity).toLocaleString()}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={handleBuy}
          disabled={(selectedStock.price * quantity) > virtualCash}
          className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Buy
        </button>
        <button 
          onClick={handleSell}
          disabled={!holding || holding.quantity < quantity}
          className="bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sell
        </button>
      </div>
      
      {/* Info Text */}
      <p className="text-purple-200 text-center text-sm mt-4">
        {(selectedStock.price * quantity) > virtualCash && 'Insufficient funds to buy'}
        {holding && holding.quantity < quantity && 'Not enough shares to sell'}
      </p>
    </div>
  );
}
