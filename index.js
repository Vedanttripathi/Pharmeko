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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.js'));
    })

app.listen(port, () => console.log('Server Up! and sound on port ' + port));