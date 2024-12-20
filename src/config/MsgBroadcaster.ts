// filename: MsgBroadcaster.ts
import { MsgBroadcaster } from '@injectivelabs/wallet-ts'
import { walletStrategy } from './Wallet.ts'
import { NETWORK } from './Services.ts';

export const msgBroadcaster = new MsgBroadcaster({
  walletStrategy,
  network: NETWORK,
})