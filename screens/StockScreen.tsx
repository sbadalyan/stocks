import { useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput } from 'react-native';
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
  
  const renderItem = useCallback(({item}: {item: StockType}) => {
    return (
      <View style={styles.stockItem}>
        <Text>Name: {item.name}</Text>
        <Text>Country: {item.country}</Text>
        <Text>Currency: {item.currency}</Text>
      </View>
    );
  }, []);

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
          onChangeText={(value) => setSearchText(value)}
          style={styles.searchInput}
          placeholder='...'
        />
      </View>
      <FlatList
          data={stockList}
          renderItem={renderItem}
          keyExtractor={(item: StockType, index: number) => item.symbol+"-"+index}
          windowSize={20}
          initialNumToRender={50}
          removeClippedSubviews
          onEndReached={() => {console.log('end reached')}}
        />
    </View>
  );
}

export default StockScreen;