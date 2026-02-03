import { useCallback, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import InvestmentsScreen from './CatsScreen';
import StockScreen from "./StockScreen";
import styles from './styles';

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(1);

  const tabs = [
    { 
      id: 1,
      name: 'Cats',
    },
    { 
      id: 2,
      name: 'Stocks',
    },
  ]

  const renderTaps = () => {
    return (
      tabs.map((tab, id) => {
       return (
        <Pressable 
          key={id}
          onPress={() => onTabClick(tab.id)}  
          style={[styles.tab, tab?.id === activeTab ? styles.activeTab :{}]}
        >
          <Text>{tab.name}</Text>
        </Pressable>
        );
      })
    );
  };

  const onTabClick = useCallback((tabId: number) => {
    setActiveTab(tabId);
    setModalVisible(!modalVisible);
  }, [modalVisible]);


  const renderTask1 = useCallback(() => {
    return(
      <View style={styles.content}>
        <InvestmentsScreen/>
      </View>
    );
  }, []);
  const renderTask2 = useCallback(() => {
    return(
      <View>
        <StockScreen />
      </View>
    );
  }, []);

  const renderContent = useCallback(() => {
   if(activeTab === 1){
      return renderTask1();
    } else {
      return renderTask2();
    }
  }, [activeTab, renderTask1, renderTask2]);

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>{renderTaps()}</View>
      {renderContent()}
    </View>
  )
}
export default HomeScreen;