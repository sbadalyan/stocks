import axios from "axios";
import Papa from "papaparse";
import { API_KEY, BASE_URL } from "../config";

export interface StockData {
  "Global Quote": {
    "01. symbol": string;
    "02. open": string;
    "03. high": string;
    "04. low": string;
    "05. price": string;
    "06. volume": string;
    "07. latest trading day": string;
    "08. previous close": string;
    "09. change": string;
    "10. change percent": string;
  }
}

export const fetchStockDataBySymbol = async (symbol: string) => {
  const response = await axios.get(BASE_URL, {
    params: {
      function: "GLOBAL_QUOTE",
      symbol: symbol,
      apikey: API_KEY,
    },
  });
  return response.data as StockData;
};

export interface StockSymbol {
  symbol: string;
  name: string;
}

export const fetchAllStocks = async () => {
  const response = await axios.get(BASE_URL, {
    params: {
      function: "LISTING_STATUS",
      apikey: API_KEY,
    },
    responseType: "text",
  });
  const parsed = Papa.parse(response.data, { header: true });
  return (parsed.data || []) as StockSymbol[];
};
