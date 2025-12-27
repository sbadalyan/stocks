import React, { useCallback } from 'react';
import { FlatList, Text, View, ActivityIndicator, RefreshControl } from 'react-native';
import useInvestments from '../hooks/useInvestments';


const Row = React.memo(({item}: {item: any}) => {
  return (
    <View style={{ padding: 16, borderBottomWidth: 1 }}>
      <Text>{item?.name}</Text>
      <Text>{item?.value}</Text>
    </View>
  );
});

export default function InvestmentsScreen() {


  const { data, isLoading, loadMore, refresh, isRefreshing} = useInvestments();

  const renderRow = useCallback(({item}: {item: any}) => {
    return <Row item={item}/>
  }, []);

  return (
    <FlatList
      data={data}
      renderItem={renderRow}
      keyExtractor={item => item?.id.toString()}
      initialNumToRender={10}
      windowSize={30}
      getItemLayout={(_, index) => ({length: 64, offset: 64 * index, index})}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
      }
      ListFooterComponent={isLoading ? <ActivityIndicator size="small" /> : null}
    />
  );
}
