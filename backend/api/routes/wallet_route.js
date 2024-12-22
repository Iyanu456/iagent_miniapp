const express = require('express');
const Wallet = require('../models/wallet_model');
const router = express.Router();
const { encrypt } = require('../utils/encrypt');
const { createInjectiveWallet } = require('../utils/create_wallet');
const { v4: uuidv4 } = require('uuid'); // UUID library

// Endpoint: Create New Wallet
router.post('/wallet', async (req, res) => {
    try {
        // Generate a unique userId
        const userId = uuidv4();

        // Wait for the wallet creation to be complete
        const walletData = await createInjectiveWallet();

        if (!walletData.privateKey || !walletData.injectiveAddress) {
            return res.status(500).json({ error: 'Wallet creation failed' });
        }

        // Encrypt the private key
        const encryptedPrivateKey = encrypt(walletData.privateKey);

        // Check for duplicate `inj_address`
        const existingWallet = await Wallet.findOne({ injective_address: walletData.injectiveAddress });
        if (existingWallet) {
            return res.status(400).json({ error: 'Wallet with this Injective address already exists' });
        }

        // Save wallet details to the database
        console.log('wallet data: ', walletData);
        console.log('inj address : ', walletData.injectiveAddress)
        const wallet = new Wallet({
            userId: userId, // Add generated userId
            injective_address: walletData.injectiveAddress,
            evm_address: walletData.evmAddress,
            balance: 0,
            private_key: encryptedPrivateKey,
        });

        await wallet.save();

        // Respond with the created wallet details
        res.json({
            ok: true,
            userId, // Include userId in the response
            inj_address: walletData.injectiveAddress,
            evm_address: walletData.evmAddress,
        });
    } catch (error) {
        console.error('Error creating wallet:', error);
        res.status(500).json({ error: 'Failed to create wallet' });
    }
});

module.exports = router;
