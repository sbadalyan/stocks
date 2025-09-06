import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StockList from "./components/StockList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView>
        <StockList />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

export default App;
