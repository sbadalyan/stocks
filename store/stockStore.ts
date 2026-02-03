import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type StockType = {
  symbol: string;
  name: string;
  exchange: string;
  country: string;
  currency: string;
};

interface StockStore {
  stockData: StockType[],
  setStockData: (stockData: StockType[]) => void,
  getStockData: () => StockType[],
}

const useStockStore = create<StockStore>()(
  persist(
  (set, get) => ({
    stockData: [],
    setStockData: (stockData) => {
      set({stockData});
    },
    getStockData: () => {
      return get().stockData;
    },
  }),
  {
    name: 'stock-storage',
    storage: createJSONStorage(() => AsyncStorage),
  }
)
);

export default useStockStore;