const numberService = require('../services/numberService');

const WINDOW_SIZE = 10;

async function getNumbers(req, res) {
  const { numberid } = req.params;
  const validTypes = ['p', 'f', 'e', 'r'];
  
  if (!validTypes.includes(numberid)) {
    return res.status(400).json({ error: 'Invalid number type' });
  }

  try {
    const result = await numberService.processNumbers(numberid, WINDOW_SIZE);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getNumbers };