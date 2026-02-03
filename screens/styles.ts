import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#023E8A',
  },
  tab: {
    padding: 12,
    backgroundColor: '#0077B6',
  },
  activeTab: {
    backgroundColor: '#48CAE8',
  },
   centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    height: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeModal: {
    position: 'absolute', 
    top: 20, 
    right: 20
  },
  content: {
    paddingBottom: 30
  },
  stockItem: {
    marginBottom: 20, 
    borderWidth: 1, 
    borderColor: 'blue', 
    padding: 20,
  },
  stockContent: {
    marginTop: 20, 
    paddingHorizontal: 20
  },
  search: {
    marginBottom: 20
  },
  searchInput: {
    borderWidth: 1, 
    height: 40, 
    paddingHorizontal: 5
  }
});
export default styles;