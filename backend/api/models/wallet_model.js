const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Unique user ID
    current_injective_address: { type: String, required: true, unique: true},
    wallets: [
        {
            wallet_name: {type: String, required: true, unique: true},
            injective_address: { type: String, required: true, unique: true },
            evm_address: { type: String, required: true, unique: true },
            private_key: { type: String, required: true }, // Encrypted private key
            balance: { type: Number, default: 0 }, // Wallet balance
        }
    ],
});

module.exports = mongoose.model('Wallet', walletSchema);
