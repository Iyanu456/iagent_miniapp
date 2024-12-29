const express = require('express');
const Wallet = require('../models/wallet_model');
const router = express.Router();
const { encrypt } = require('../utils/encrypt');
const { createInjectiveWallet } = require('../utils/create_wallet');

// Endpoint: Create New Wallet
router.post('/wallet', async (req, res) => {
    try {
        const { userId } = req.body;

        const wallet_name = 'wallet';

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
        const wallet = new Wallet({
            userId,
            current_injective_address: walletData.injectiveAddress,
            wallets: [
                {
                    wallet_name,
                    injective_address: walletData.injectiveAddress,
                    evm_address: walletData.evmAddress,
                    private_key: encryptedPrivateKey,
                },
            ],
        })

        await wallet.save();

        // Respond with the created wallet details
        res.json({
            ok: true,
            userId, // Include userId in the response
            wallet_name,
            injective_address: walletData.injectiveAddress,
            evm_address: walletData.evmAddress,
        });
    } catch (error) {
        console.error('Error creating wallet:', error);
        res.status(500).json({ error: 'Failed to create wallet' });
    }
});



// Endpoint: Add a New Wallet to an Existing User
router.post('/wallet/add', async (req, res) => {
    try {
        const { userId, wallet_name } = req.body;

        // Validate user
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }


        // Validate wallet name
        if (!wallet_name) {
            return res.status(400).json({ error: 'Your wallet name is required' });
        }


        // Find user by userId
        const userWallets = await Wallet.findOne({ userId });

        if (!userWallets) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the wallet name already exists for this user
        const walletNameExists = userWallets.wallets.some(
            (wallet) => wallet.wallet_name === wallet_name
        );

        if (walletNameExists) {
            return res.status(400).json({ error: 'Wallet name already exists' });
        }

        // Generate a new wallet
        const walletData = await createInjectiveWallet();
        if (!walletData.privateKey || !walletData.injectiveAddress) {
            return res.status(500).json({ error: 'Wallet creation failed' });
        }

        // Encrypt the private key
        const encryptedPrivateKey = encrypt(walletData.privateKey);

        // Add new wallet to the user's wallets array
        userWallets.wallets.push({
            wallet_name,
            injective_address: walletData.injectiveAddress,
            evm_address: walletData.evmAddress,
            private_key: encryptedPrivateKey,
            balance: 0,
        });

        // Save the updated user data
        await userWallets.save();

        // Respond with the updated user data
        res.json({
            ok: true,
            userId: userWallets.userId,
            newWallet: {
                wallet_name,
                injective_address: walletData.injectiveAddress,
                evm_address: walletData.evmAddress,
            },
            wallets: userWallets.wallets.map(wallet => ({
                wallet_name: wallet.wallet_name,
                injective_address: wallet.injective_address,
                evm_address: wallet.evm_address,
                balance: wallet.balance,
            })),
        });
    } catch (error) {
        console.error('Error adding wallet:', error);
        res.status(500).json({ error: 'Failed to add wallet' });
    }
});


module.exports = router;
