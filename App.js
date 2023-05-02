import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/stacknavigation';
import { Provider } from 'react-redux';
import store from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
};


export default App;
