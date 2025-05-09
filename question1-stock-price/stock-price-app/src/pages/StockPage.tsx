import React, { useState, useEffect } from 'react';
import { Container, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import StockChart from '../components/StockChart';
import { getStocks } from '../services/api';
import { StocksResponse } from '../types/stocks';

export default function StockPage() {
  const [stocks, setStocks] = useState<StocksResponse>({});
  const [selectedTicker, setSelectedTicker] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const result = await getStocks();
        setStocks(result);
        if (Object.keys(result).length > 0) {
          setSelectedTicker(Object.values(result)[0]);
        }
      } catch (error) {
        console.error('Error fetching stocks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStocks();
  }, []);

  const handleTickerChange = (event: any) => {
    setSelectedTicker(event.target.value as string);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ marginTop: 3 }}>
        Stock Price Analysis
      </Typography>
      
      {loading ? (
        <Typography>Loading stocks...</Typography>
      ) : (
        <>
          <FormControl fullWidth sx={{ marginBottom: 3, marginTop: 2 }}>
            <InputLabel id="stock-select-label">Select Stock</InputLabel>
            <Select
              labelId="stock-select-label"
              value={selectedTicker}
              label="Select Stock"
              onChange={handleTickerChange}
            >
              {Object.entries(stocks).map(([name, ticker]) => (
                <MenuItem key={ticker} value={ticker}>
                  {name} ({ticker})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedTicker && (
            <StockChart ticker={selectedTicker} />
          )}
        </>
      )}
    </Container>
  );
}