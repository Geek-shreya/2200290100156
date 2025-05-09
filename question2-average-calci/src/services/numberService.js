const axios = require('axios');
const API_BASE = 'http://20.244.56.144/evaluation-service';

// Window state maintained in memory (in production, use a database)
const windowState = {
  p: [], // primes
  f: [], // fibonacci
  e: [], // even
  r: []  // random
};

const typeToEndpoint = {
  p: 'primes',
  f: 'fibo',
  e: 'even',
  r: 'rand'
};

async function fetchNumbers(type) {
  const endpoint = typeToEndpoint[type];
  try {
    const response = await axios.get(`${API_BASE}/${endpoint}`, { timeout: 500 });
    return response.data.numbers || [];
  } catch (error) {
    console.error(`Error fetching ${type} numbers:`, error.message);
    return [];
  }
}

function updateWindowState(type, newNumbers) {
  const currentWindow = windowState[type];
  const uniqueNewNumbers = [...new Set(newNumbers)];
  
  // Add new numbers, keeping only unique values
  const updatedWindow = [...currentWindow];
  for (const num of uniqueNewNumbers) {
    if (!updatedWindow.includes(num)) {
      updatedWindow.push(num);
    }
  }
  
  // Maintain window size
  if (updatedWindow.length > WINDOW_SIZE) {
    updatedWindow.splice(0, updatedWindow.length - WINDOW_SIZE);
  }
  
  windowState[type] = updatedWindow;
  return updatedWindow;
}

function calculateAverage(numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return parseFloat((sum / numbers.length).toFixed(2));
}

async function processNumbers(type, windowSize) {
  const prevState = [...windowState[type]];
  const newNumbers = await fetchNumbers(type);
  
  if (newNumbers.length > 0) {
    updateWindowState(type, newNumbers);
  }
  
  const currState = windowState[type];
  const avg = calculateAverage(currState);
  
  return {
    windowPrevState: prevState,
    windowCurrState: currState,
    numbers: newNumbers,
    avg
  };
}

module.exports = { processNumbers };