import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import {theme} from './src/styles/theme';
import {AlarmsProvider} from './src/state/AlarmsContext';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AlarmsProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </AlarmsProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
