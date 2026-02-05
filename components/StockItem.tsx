import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from "../constants/queryKeys";
import { View, Text, ActivityIndicator } from 'react-native';
import styles from "./styles";


type StockType = {
  symbol: string,
  name: string,
  exchange: string,
  country: string,
  currency: string,
};

const StockItem = ({item, isVisible}: {item: StockType, isVisible: boolean}) => {
  const { data: stockData, isLoading } = useQuery({
    queryKey: QUERY_KEYS.STOCK_DATA_TWELVE(item.symbol),
    queryFn: () => fetchStockDataBySymbol(item.symbol),
    enabled: isVisible,
  });

  const fetchStockDataBySymbol =  async (symbol: string) => {
    try {
      const res = await fetch(`https://api.twelvedata.com/quote?symbol=${symbol}&apikey=547d45bfd5c84b26a708b98eeac2d9ea`);

      if(!res.ok){
        throw new Error();
      }

      const data = await res.json();

      return data || {};
    } catch(error) {
      return {};
    }
  }

  const renderStockData = useCallback(() => {
    if(!stockData?.price && stockData?.message){
      return null
    }
    return (
      <View>
        <Text>Exchange: {stockData.exchange}</Text>
        <Text>Currency: {stockData.currency}</Text>
        <Text>Price: {stockData.price}</Text>
      </View>
    );
  }, [stockData]);

  return (
    <View style={styles.item}>
      <Text>Name: {item.name}</Text>
      <Text>Country: {item.country}</Text>
      <Text>Currency: {item.currency}</Text>
      {isLoading && <ActivityIndicator size='small'/>}

      {stockData && renderStockData()}
    </View>
  );

}
export default StockItem;