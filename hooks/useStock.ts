import { useEffect, useMemo, useState } from 'react';
import useStockStore from '../store/stockStore';
import useDebounce from './useDebounce';

type StockType = {
  symbol: string,
  name: string,
  exchange: string,
  country: string,
  currency: string,
};

const useStock = () => {
  const [data, setData] = useState<StockType[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [searchText, setSearchText] = useState<string>('');
  const debounceValue = useDebounce(searchText);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async() => {
      if(useStockStore.getState().stockData.length > 0){
        setData(useStockStore.getState().stockData);
        return
      }

      try {
        setLoading(true);
        const res = await fetch('https://api.twelvedata.com/stocks?apikey=547d45bfd5c84b26a708b98eeac2d9ea', {signal: controller.signal});
        if(!res.ok){
          throw new Error('API error');
        }
        const json = await res.json();
        setData(json?.data || []);
        useStockStore.setState({ stockData: json?.data || [] }); 
      } catch(error){
        if(error instanceof Error && error.name !== 'AbortError'){
          setIsError(true)
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    return () => controller.abort();
  }, []);

  const stockList = useMemo(() => {
    if(!data){
      return [];
    };

    if(!debounceValue){
      return data;
    } 

    const searchTerm = debounceValue.toLowerCase(); 
    return data.filter((item: StockType) => 
    item.name?.toLowerCase().includes(searchTerm) || 
    item.symbol?.toLowerCase().includes(searchTerm));

  }, [data, debounceValue]);

  return {data, searchText, setSearchText, stockList, loading, isError};
}

export default useStock;