const mongoose = require('mongoose');
require('dotenv').config({path: './config.env'});


mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected successfully')).catch((err) => console.log(err));