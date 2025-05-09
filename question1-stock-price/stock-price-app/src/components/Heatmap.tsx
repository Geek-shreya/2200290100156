import React, { useState, useEffect } from 'react';
import { Heatmap } from 'recharts';
import { getStocks, getStockData } from '../services/api';
import { StockInfo, StockDataPoint } from '../types/stocks';

export default function CorrelationHeatmap() {
  const [stocks, setStocks] = useState<StockInfo[]>([]);
  const [timeFrame, setTimeFrame] = useState<number>(10);
  const [correlationData, setCorrelationData] = useState<number[][]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const result = await getStocks();
        setStocks(
          Object.entries(result)
            .slice(0, 5)
            .map(([name, ticker]) => ({ name, ticker }))
        );
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };
    fetchStocks();
  }, []);

  useEffect(() => {
    const calculateCorrelations = async () => {
      if (stocks.length === 0) return;

      setLoading(true);
      try {
        const allData = await Promise.all(
          stocks.map(({ ticker }) => getStockData(ticker, timeFrame))
        );

        const correlations = stocks.map((_, i) =>
          stocks.map((_, j) => calculatePearson(allData[i], allData[j]))
        );
        setCorrelationData(correlations);
      } catch (error) {
        console.error('Error calculating correlations:', error);
      } finally {
        setLoading(false);
      }
    };
    calculateCorrelations();
  }, [stocks, timeFrame]);

  // Correct the calculation of Pearson's correlation
  function calculatePearson(stockA: StockDataPoint[], stockB: StockDataPoint[]): number {
    if (stockA.length !== stockB.length || stockA.length === 0) return 0;

    const n = stockA.length;
    const sumA = stockA.reduce((sum, item) => sum + item.price, 0);
    const sumB = stockB.reduce((sum, item) => sum + item.price, 0);

    const sumASq = stockA.reduce((sum, item) => sum + Math.pow(item.price, 2), 0);
    const sumBSq = stockB.reduce((sum, item) => sum + Math.pow(item.price, 2), 0);

    const pSum = stockA.reduce((sum, _, idx) => sum + (stockA[idx].price * stockB[idx].price), 0);

    const num = pSum - (sumA * sumB / n);
    const den = Math.sqrt((sumASq - Math.pow(sumA, 2) / n) * (sumBSq - Math.pow(sumB, 2) / n));

    return den !== 0 ? num / den : 0;
  }

  return (
    <div className="heatmap-container">
      <div className="time-frame-selector" style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setTimeFrame(10)}
          style={{ marginRight: '10px', padding: '5px 10px' }}
        >
          10 min
        </button>
        <button
          onClick={() => setTimeFrame(30)}
          style={{ marginRight: '10px', padding: '5px 10px' }}
        >
          30 min
        </button>
        <button
          onClick={() => setTimeFrame(60)}
          style={{ padding: '5px 10px' }}
        >
          1 hour
        </button>
      </div>

      {loading ? (
        <p>Loading correlation data...</p>
      ) : stocks.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <Heatmap
            xLabels={stocks.map(({ name }) => name)}
            yLabels={stocks.map(({ name }) => name)}
            data={correlationData}
            height={500}
            width={Math.max(600, stocks.length * 100)}
            cellOptions={{
              colorMap: {
                type: 'continuous',
                min: -1,
                max: 1,
                colors: ['#d32f2f', '#ffffff', '#2e7d32'],
              },
            }}
          />
        </div>
      ) : (
        <p>No stocks available for correlation analysis</p>
      )}
    </div>
  );
}
