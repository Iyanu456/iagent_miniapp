
  const {
    chainBankApi,
    indexerSpotApi,
    indexerDerivativesApi,
  } = require ('./services.js')
  
  const { getDefaultSubaccountId } = require('@injectivelabs/sdk-ts');
  
  
  export const fetchDerivativeMarkets = async () => {
    return await indexerDerivativesApi.fetchMarkets()
  }
  
  export const fetchPositions = async (injectiveAddress) => {
    const subaccountId = getDefaultSubaccountId(injectiveAddress)
  
    return await indexerDerivativesApi.fetchPositions({ subaccountId })
  }
  
  export const fetchSpotMarkets = async () => {
    return await indexerSpotApi.fetchMarkets()
  }
  
  export const fetchBankBalances = async (injectiveAddress) => {
    return await chainBankApi.fetchBalances(injectiveAddress)
  }
  
