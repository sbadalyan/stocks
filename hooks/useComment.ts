import { useState, useEffect, useCallback, useRef } from 'react';

function useComment(){
  const [comments, setComments] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //const isMounted = useRef(false);

  // useEffect(() => {
  //   isMounted.current = true;

  //   return () => { isMounted.current = false }
  // }, []);

  const fetchData = useCallback(async () => {
    const controller = new AbortController();
    setIsLoading(true);
    setIsError(false);
    const url = 'https://jsonplaceholder.typicode.com/comments';
    try {
      const res = await fetch(url);

      if(!res.ok){
        throw new Error('Api error');
      }

     // if(!isMounted.current) return

      const data = await res.json();
      setComments(data || []);
    } catch(error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }

    return () => controller.abort();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { comments, isError, isLoading, refetch: fetchData };
};

export default useComment;
