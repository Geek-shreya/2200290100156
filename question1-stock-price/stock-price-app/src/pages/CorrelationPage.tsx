import React from 'react';
import { Container, Typography } from '@mui/material';
import CorrelationHeatmap from '../components/Heatmap';

export default function CorrelationPage() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ marginTop: 3 }}>
        Stock Correlation Heatmap
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ marginBottom: 3 }}>
        Showing correlation between stocks over selected time period
      </Typography>
      
      <CorrelationHeatmap />
    </Container>
  );
}