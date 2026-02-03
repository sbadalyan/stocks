import React from "react";
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import StockList from "./components/StockList";
//import Comments from "./screens/CommentScreen";
import HomeScreen from "./screens/HomeScreen";

const queryClient = new QueryClient();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <HomeScreen />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

export default App;
