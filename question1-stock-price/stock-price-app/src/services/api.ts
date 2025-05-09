import axios from 'axios';
import { StockDataPoint, StocksResponse } from '../types/stocks';

const API_BASE = 'http://20.244.56.144/evaluation-service';
let authToken = '';

export const setAuthToken = (token: string): void => {
  authToken = token;
};

export const getStocks = async (): Promise<StocksResponse> => {
  const response = await axios.get<{ stocks: StocksResponse }>(
    `${API_BASE}/stocks`,
    { headers: { Authorization: `Bearer ${authToken}` } }
  );
  return response.data.stocks;
};

export const getStockData = async (
  ticker: string, 
  minutes: number = 10
): Promise<StockDataPoint[]> => {
  const response = await axios.get<StockDataPoint | StockDataPoint[]>(
    `${API_BASE}/stocks/${ticker}?minutes=${minutes}`,
    { headers: { Authorization: `Bearer ${authToken}` } }
  );
  const data = response.data;
  return Array.isArray(data) ? data : [data];
};