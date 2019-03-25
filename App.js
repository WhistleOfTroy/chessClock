import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import BlackClock from './src/clocks'


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <BlackClock/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: 'column',
    backgroundColor: 'black',
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: 'white'
  }
});
