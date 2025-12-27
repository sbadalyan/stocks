import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';

type StockItemType = {
  id: string;
  symbol: string;
  price: number;
  change: number;
};

const StockRow = React.memo(({stock}: {stock: StockItemType }) => {
  return (
     <View style={{ padding: 16 }}>
      <Text>{stock.symbol}</Text>
      <Text>{stock.price}</Text>
      <Text>{stock.change}%</Text>
    </View>
  );
});

const PortfolioScreen = ({ stocks }: {stocks: StockItemType[]}) => {

  const [ data, setData ] = useState(stocks);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevState => 
        prevState.map(stock => {
          const newPrice = stock.price + Math.random() - 0.5;
          if(Math.abs(newPrice - stock.price) < 0.01){
            return stock
          } else {
            return {
              ...stock,
              price: newPrice
            }
          }
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderRow = useCallback(({item}: {item: any}) => {
    return <StockRow stock={item}/>;
  }, []);

  return (
    <FlatList
      data={data}
      renderItem={renderRow}
      keyExtractor={(item) => item.id.toString()}
      getItemLayout={(_, index) => ({ length: 64, offset: 64*index, index })}
      initialNumToRender={20}
      windowSize={20}
      removeClippedSubviews
    />
  );


};
export default PortfolioScreen;