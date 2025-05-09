export interface StockDataPoint {
    price: number;
    lastUpdatedAt: string;
  }
  
  export interface StocksResponse {
    [companyName: string]: string;
  }
  
  export interface StockInfo {
    name: string;
    ticker: string;
  }