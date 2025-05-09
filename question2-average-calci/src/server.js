const express = require('express');
const app = require('./app');
const port = process.env.PORT || 9876;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});