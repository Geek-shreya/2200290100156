import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { getStockData } from '../services/api';
import { StockDataPoint } from '../types/stocks';

interface StockChartProps {
  ticker: string;
}

export default function StockChart({ ticker }: StockChartProps) {
  const [timeFrame, setTimeFrame] = useState<number>(10);
  const [data, setData] = useState<StockDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getStockData(ticker, timeFrame);
        setData(result);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [ticker, timeFrame]);

  const avg = data.length > 0 ? data.reduce((sum, item) => sum + item.price, 0) / data.length : 0;

  return (
    <div className="stock-chart-container">
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
        <p>Loading...</p>
      ) : data.length > 0 ? (
        <LineChart
          xAxis={[{
            data: data.map((_, i) => i),
            label: 'Time Points',
            scaleType: 'point'
          }]}
          series={[
            {
              data: data.map(item => item.price),
              label: 'Price',
              showMark: true,
              color: '#1976d2'
            },
            {
              data: Array(data.length).fill(avg),
              label: 'Average',
              color: '#d32f2f',
            }
          ]}
          height={400}
          margin={{ top: 20, bottom: 60, left: 60, right: 20 }}
        />
      ) : (
        <p>No data available for this stock</p>
      )}
    </div>
  );
}