import React, { useCallback } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchStockDataBySymbol, StockData } from "../services/alphaVantage";
import QUERY_KEYS from "../constants/queryKeys";
import { STOCK_GLOBAL_QUOTE } from "../mock";
import styles from "./styles";


interface StockItemPropsType {
  symbol: string;
  name: string;
  visible: boolean;
};

const StockItem = ({ symbol, name, visible }: StockItemPropsType) => {
  const { data: stockData, isLoading, error } = useQuery<StockData>({
    queryKey: QUERY_KEYS.STOCK_DATA(symbol),
    queryFn: () => fetchStockDataBySymbol(symbol),
    enabled: visible,
  });
  const data = !stockData || !stockData["Global Quote"] ? STOCK_GLOBAL_QUOTE : stockData;

  const renderStockData = useCallback(() => {
    if (!data || !data["Global Quote"]) return null;
    return (
      <View>
        <Text>Open: ${data["Global Quote"]["02. open"]}</Text>
        <Text>High: ${data["Global Quote"]["03. high"]}</Text>
        <Text>Low: ${data["Global Quote"]["04. low"]}</Text>
        <Text>Price: ${data["Global Quote"]["05. price"]}</Text>
        <Text>Volume: ${data["Global Quote"]["06. volume"]}</Text>
        <Text>Latest Trading Day: ${data["Global Quote"]["07. latest trading day"]}</Text>
        <Text>Previous Close: ${data["Global Quote"]["08. previous close"]}</Text>
        <Text>Change: ${data["Global Quote"]["09. change"]}</Text>
        <Text>Change Percent: ${data["Global Quote"]["10. change percent"]}</Text>
      </View>
    );
  }, [data]);

  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.title}>{name} ({symbol})</Text>
        {isLoading && <ActivityIndicator size="small" />}
        {error && <Text>Error</Text>}
        {stockData && renderStockData()}
      </View>
    </View>
  );
};

export default StockItem;
