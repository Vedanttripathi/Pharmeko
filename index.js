const express = require('express');
const cors = require('cors');
const app = express();
require('./db/mongoose');
const loginroute = require('./routes/loginapi');
const stocksroute = require('./routes/stockapi');

app.use(express.json());
app.use(cors());

app.use(loginroute);
app.use(stocksroute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server Up! and sound on port ' + port));