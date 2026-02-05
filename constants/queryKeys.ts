export const QUERY_KEYS = {
  STOCK_DATA: (symbol: string) => ["stock_data", symbol],
  STOCK_DATA_TWELVE: (symbol: string) => ["stock_data_twelve", symbol],
  LIST_ALL_STOCKS: ["list_all_stocks"],
};

export default QUERY_KEYS;
