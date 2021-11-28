const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    company: {
        type: String,
        trim: true,
        required: true
    },
    medicine: {
        type: String,
        trim: true,
        required: true
    },
    salt: {
        type: String,
        trim: true
    },
    qty: {
        type: Number,
        required: true,
    },
    costprice: {
        type: Number,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    dateofpurchase: {
        type: Date,
        required: true
    },
    dateofexpiry: {
        type: Date,
        required: true
    },
    profit: {
        type: Number,
    },
    unit: {
        type: String,
        required: true
    },
    profitqty: {
        type: Number,
    },
    reference: {
        type: String
    }
});


const stockModel = mongoose.model('Stocks', stockSchema);

module.exports = stockModel;