const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupMemberSchema = new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('GroupMember', groupMemberSchema);
