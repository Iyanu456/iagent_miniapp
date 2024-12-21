// filename: Services.ts
const {
    ChainGrpcBankApi,
    IndexerGrpcSpotApi,
    IndexerGrpcDerivativesApi,
    IndexerGrpcDerivativesStream
  } = require ('@injectivelabs/sdk-ts');
 const { getNetworkEndpoints, Network } = require ('@injectivelabs/networks')
  
  // Getting the pre-defined endpoints for the Testnet environment
  // (using TestnetK8s here because we want to use the Kubernetes infra)
  const NETWORK = Network.Testnet
  const ENDPOINTS = getNetworkEndpoints(NETWORK)
  
  const chainBankApi = new ChainGrpcBankApi(ENDPOINTS.grpc)
  const indexerSpotApi = new IndexerGrpcSpotApi(ENDPOINTS.indexer)
  const indexerDerivativesApi = new IndexerGrpcDerivativesApi(
    ENDPOINTS.indexer,
  )
  
  const indexerSpotStream = new IndexerGrpcDerivativesStream(
    ENDPOINTS.indexer,
  )
  const indexerDerivativeStream = new IndexerGrpcDerivativesStream(
    ENDPOINTS.indexer,
  )


  module.exports = { 
    NETWORK, 
    ENDPOINTS, 
    chainBankApi, 
    indexerSpotApi, 
    indexerDerivativesApi, 
    indexerSpotStream, 
    indexerDerivativeStream
};