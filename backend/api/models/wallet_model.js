const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Changed to String
    injective_address: { type: String, required: true, unique: true },
    evm_address: { type: String, required: true },
    balance: { type: Number, default: 0 },
    private_key: { type: String, required: true },
});

module.exports = mongoose.model('Wallet', walletSchema);
