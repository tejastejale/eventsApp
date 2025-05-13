import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Components/Screens/Auth/Login';
import Main from './Components/Screens/Content/Main/Main';
import Bottom from './Components/Screens/Content/Bottom';
import RemoteNotification from './Components/Remote';

function App() {
  const Stack = createStackNavigator();

  return (
    <>
      <RemoteNotification />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Main">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Main" component={Bottom} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
