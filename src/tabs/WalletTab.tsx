//import { useState, useEffect } from 'react';
//import { Wallet } from '@injectivelabs/wallet-ts';
//import { getAddresses } from '../config/walletConnection.ts';
//import { fetchBankBalances } from '../config/Query.ts';




export default function WalletTab(props: any) {
  

  return (
    <main className='w-[100vw] grid place-items-center'>
         <div className="flex flex-col gap-[1.5em] justify-center center-align">
      {props.balance !== null && (
        <p className="font-semibold text-[2.2em] text-center">{props.balance} INJ</p>
      )}
      
      {/*address && <p className="text-gray-700">Address: {address}</p>*/}
      {props.error && <p className="text-white">{props.error}</p>}
    </div>
    </main>
   
  );
}
