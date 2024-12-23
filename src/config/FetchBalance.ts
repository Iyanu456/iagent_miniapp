import { fetchBankBalances } from "./Query";


export default async function fetchBalance(injectiveAddress: string){
    try {
      const response = await fetchBankBalances(injectiveAddress);

      // Assuming the response contains 'balances' field with 'denom' and 'amount'
      const balanceData = response.balances[0];
      const amount = balanceData?.amount || "0";

      // Convert balance to a human-readable format (adjust based on smallest unit)
      const formattedBalance = parseFloat(amount) / 1e18;

      // Format the balance to 4 decimal places
      console.log('balance fetched')
      return(formattedBalance.toFixed(3));

    } catch (error) {
      return("0.0000 INJ"); // Default value in case of error
    }
  };
