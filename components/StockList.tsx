
import React, { useState, useCallback } from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchAllStocks, StockSymbol } from "../services/alphaVantage";
import QUERY_KEYS from "../constants/queryKeys";
import { STOCK_SYMBOLS } from "../mock";
import StockItem from "./StckItem";
import styles from "./styles";

const StockList = () => {

  const { data: symbolList, error, isLoading } = useQuery<Array<StockSymbol>>({
    queryKey: QUERY_KEYS.LIST_ALL_STOCKS,
    queryFn: () => fetchAllStocks(),
  });

  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: { item: StockSymbol }[] }) => {
    setVisibleItems(viewableItems.map((item) => item.item.symbol));
  }, []);

  const renderStockItem = (item: StockSymbol) => (
    <StockItem symbol={item.symbol} name={item.name} visible={visibleItems.includes(item.symbol)} />
  );

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }
  
  return (
    <FlatList
      data={symbolList?.length ? symbolList : STOCK_SYMBOLS}
      keyExtractor={(item) => item.symbol}
      renderItem={({ item }) => renderStockItem(item)}
      contentContainerStyle={styles.container}
      style={styles.list}
      initialNumToRender={5}
      viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  );
};

export default StockList;