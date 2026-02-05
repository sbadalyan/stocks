import { useCallback, useRef, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput, ViewToken} from 'react-native';
import StockItem from '../components/StockItem';
import useStock from '../hooks/useStock';
import styles from './styles';

type StockType = {
  symbol: string,
  name: string,
  exchange: string,
  country: string,
  currency: string,
};

const StockScreen = () => {
  const {stockList, searchText, setSearchText, loading, isError} = useStock();
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  
  const renderItem = useCallback(({item}: {item: StockType}) => {
    return <StockItem item={item} isVisible={visibleItems.has(item.symbol)} />;
  }, [visibleItems]);

  const onViewableItemsChanged = useRef(({ viewableItems }: {viewableItems : ViewToken[]}) => {
    const viewableItemsList = new Set<string>();
    viewableItems.forEach(viewable => viewableItemsList.add(viewable.item?.symbol));
    setVisibleItems(viewableItemsList);

  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  if(isError){
    return <View><Text>Error...</Text></View>
  }

  if(loading){
    return <ActivityIndicator size="large" />
  }
  return (
    <View style={styles.stockContent}>
      <View style={styles.search}>
        <TextInput 
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          placeholder='Search stocks..."'
        />
      </View>
      <FlatList
          data={stockList}
          renderItem={renderItem}
          keyExtractor={(item: StockType, index: number) => item.symbol+"-"+index}
          windowSize={20}
          initialNumToRender={15}
          removeClippedSubviews
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
    </View>
  );
}

export default StockScreen;