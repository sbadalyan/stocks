
import { useCallback, useEffect, useState, useRef } from 'react';

const useInvestments = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const isFetchingRef = useRef(false);


  const fetchData = useCallback(async (pageNumber: number, refreshing: boolean) => {
    if(isFetchingRef.current){
      return;
    }
    isFetchingRef.current = true;
    setIsLoading(!refreshing);
    setIsRefreshing(refreshing);
    setIsError(false);
    try {
      const res = await fetch(`https://api.example.com/investments?page=${pageNumber}&limit=20`);
      if(!res.ok){
        throw new Error('Api error');
      }
      const json = await res.json();

      setData(prev => refreshing ? json.data : [...prev, ...json.data]);
      setTotalPages(json.pages);

    } catch(error) {
      setIsError(true);
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
      setIsRefreshing(false);
    }

  }, []);

  useEffect(() => {
    fetchData(currentPage, false);
  }, [currentPage, fetchData]);

  const loadMore = useCallback(() => {
    if(totalPages > currentPage && !isLoading && !isRefreshing){
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages, isLoading, isRefreshing]);

 const refresh = useCallback(() => {
    setCurrentPage(1);
    fetchData(1, true);
  }, [fetchData]);

  return { data, currentPage, totalPages, fetchData, loadMore, refresh, isError, isRefreshing, isLoading};
}

export default useInvestments;