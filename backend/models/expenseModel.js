// models/expenseModel.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    settled: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Expense', expenseSchema);
