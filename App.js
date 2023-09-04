import React, { useEffect } from 'react';
import { Text, TextInput, LogBox, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/stacknavigation';
import { Provider } from 'react-redux';
import store from './src/store';
import { Root } from "native-base";

const App = (props) => {
  LogBox.ignoreAllLogs();
  if (Text.defaultProps == null) Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
  if (TextInput.defaultProps == null) TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;

  /* useEffect(() => {
    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
    if (TextInput.defaultProps == null) TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
  }, []); */


  return (
    <Provider store={store}>
      <Root>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </Root>
    </Provider>
  );
};


export default App;
