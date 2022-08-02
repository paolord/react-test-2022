import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MenuSelection from './components/MenuSelection';

export default function App() {
  return (
    <View style={styles.container}>
      <MenuSelection />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#f00',
    borderWidth: 1,
    borderStyle: 'solid'
  },
});
