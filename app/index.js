const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/films', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/films');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

app.get('/api/people', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/people');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}: http://localhost:${port}`);
});
