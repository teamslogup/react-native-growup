import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

const App = function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>{'App'}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
