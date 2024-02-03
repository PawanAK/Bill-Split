// models/settlementModel.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const settlementSchema = new Schema({
    payer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Settlement', settlementSchema);
