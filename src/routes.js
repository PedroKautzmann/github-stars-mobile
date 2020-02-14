import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';
import Repository from './pages/Repository';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#7159c1',
          },
          headerTintColor: '#FFF',
          headerBackTitleVisible: false,
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ title: 'Usuários' }}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={({ route }) => ({ title: route.params.title })}
        />
        <Stack.Screen
          name="Repository"
          component={Repository}
          options={({ route }) => ({ title: route.params.title })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
