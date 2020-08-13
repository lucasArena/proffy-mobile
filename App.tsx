import React from 'react';
import 'react-native-gesture-handler';

import { StatusBar } from 'react-native';
import AppStack from './src/routes/AppStack';

const App: React.FC = () => {
  return (
    <>
      <AppStack />
      <StatusBar />
    </>
  );
};

export default App;
