const NFTGoConst = {
  /**
   * NFTGo's API base url
   */
  BASE_URL: {
    eth: 'https://data-api.nftgo.dev/eth',
  },

  /**
   * NFTGo's API url
   */
  API: {
    evm: {
      listing: {
        getListingsOfAddress: '/v1/address/listing',
        getListingsOfNFT: (contract: string, tokenId: string) => `/v1/nft/${contract}/${tokenId}/listing`,
      },
      trading: {
        getAggregateInfo: '/v1/nft-aggregate/aggregate',
      },
      collection: {
        getFilteredNFTs: (contract: string) => `/v1/collection/${contract}/filtered_nfts`,
      },
    },
  },
};

export default NFTGoConst;
