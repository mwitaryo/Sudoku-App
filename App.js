import React from 'react'
import { Provider } from 'react-redux'
import store from './src/store/index'
import HomePage from './src/pages/HomePage'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Game from './src/pages/Game'
import Finish from './src/pages/Finish'


export default function App() {

  const Stack = createStackNavigator()
  return (

    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Game" component={Game} />
          <Stack.Screen name="Finish" component={Finish} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
