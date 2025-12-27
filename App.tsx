import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import StockList from "./components/StockList";
import Books from "./screens/CommentScreen";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView>
        <Books />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

export default App;
