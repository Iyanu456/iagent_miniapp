// filename: Wallet.ts
import { WalletStrategy, Wallet } from '@injectivelabs/wallet-ts'
import { ChainId, EthereumChainId } from '@injectivelabs/ts-types'

const CHAIN_ID = ChainId.Testnet // The Injective Chain chainId
const ETHEREUM_CHAIN_ID = EthereumChainId.Sepolia // The Ethereum Chain ID

//export const alchemyRpcEndpoint = `https://eth-goerli.alchemyapi.io/v2/${process.env.APP_ALCHEMY_GOERLI_KEY}`

export const alchemyRpcEndpoint = 'https://worldchain-sepolia.g.alchemy.com/v2/ChDoaWapIqCmyqobo2KrhLhL9dNU-Dd9'

export const walletStrategy = new WalletStrategy({
  chainId: CHAIN_ID,
  ethereumOptions: {
    rpcUrl: alchemyRpcEndpoint,
    ethereumChainId: ETHEREUM_CHAIN_ID,
  },
})