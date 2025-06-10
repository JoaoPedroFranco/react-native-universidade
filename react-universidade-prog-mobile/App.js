import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeAppStackNavigator } from '@react-navigation/native-stack';

// Inicialização do banco
import { initializeStorage } from './src/db/database';

// Nossas telas
import MainView from './src/screens/MainView';
import SavedListScreen from './src/screens/SavedListScreen';

const AppStack = createNativeAppStackNavigator();

export default function App() {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName="Início">
        <AppStack.Screen
          name="Início"
          component={MainView}
          options={{ title: 'Início' }}
        />
        <AppStack.Screen
          name="Salvos"
          component={SavedListScreen}
          options={{ title: 'Universidades salvas' }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}