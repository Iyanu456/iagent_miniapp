
// filename: Query.ts
import {
  getDefaultSubaccountId,
  //OrderbookWithSequence,
} from '@injectivelabs/sdk-ts'
import {
  chainBankApi,
  indexerSpotApi,
  //indexerSpotStream,
  indexerDerivativesApi,
  //indexerDerivativeStream,
} from './Services.ts'



export const fetchDerivativeMarkets = async () => {
  return await indexerDerivativesApi.fetchMarkets()
}

export const fetchPositions = async (injectiveAddress: string) => {
  const subaccountId = getDefaultSubaccountId(injectiveAddress)

  return await indexerDerivativesApi.fetchPositions({ subaccountId })
}

export const fetchSpotMarkets = async () => {
  return await indexerSpotApi.fetchMarkets()
}

export const fetchBankBalances = async (injectiveAddress: string) => {
  return await chainBankApi.fetchBalances(injectiveAddress)
}

/*export const streamDerivativeMarketOrderbook = async (
  marketId: string,
  ) => {
  const streamOrderbookUpdates = indexerDerivativesStream.streamDerivativeOrderbookUpdate.bind(indexerDerivativeStream)
  const callback = (orderbookUpdate: OrderbookWithSequence) => {
    console.log(orderbookUpdate)
  }

  streamOrderbookUpdates({
    marketIds: [marketId],
    callback
  })
}*/

/*export const streamSpotMarketOrderbook = async (
  marketId: string,
  ) => {
  const streamOrderbookUpdates = indexerSpotsStream.streamSpotOrderbookUpdate.bind(indexerSpotStream)
  const callback = (orderbookUpdate: OrderbookWithSequence) => {
    console.log(orderbookUpdate)
  }

  streamOrderbookUpdates({
    marketIds: [marketId],
    callback
  })
}*/