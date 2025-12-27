import { AppState } from 'react-native';
import { useEffect, useRef, useState } from 'react';

function PortfolioScreen() {

  const appState = useRef(AppState.currentState);
  const intervalRef = useRef(null);

  const startPolling = () => {
    if(intervalRef.current) {
      return
    }
    intervalRef.current =  setInterval(fetchPrices, 2000);
  }

  const stopPolling = () => {
    if(intervalRef.current){
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  useEffect(() => {
    startPolling();

    const sub = AppState.addEventListener('change', nextState => {
      if(appState.current.match('/inactive/background') && nextState === 'active'){
        startPolling();
      }
      if(appState.current.match('/inactive/background')){
        stopPolling();
      }
      appState.current = nextState
    })

    return () => {
      stopPolling();
      sub.remove();
    }

  }, []);

  return null;
}