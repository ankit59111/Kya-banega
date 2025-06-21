import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { store } from './store';
import theme from './theme';
import AppRoutes from './routes';
import Navbar from './components/layout/Navbar';
import AuthInitializer from './components/auth/AuthInitializer';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <BrowserRouter>
          <AuthInitializer>
            <Navbar />
            <AppRoutes />
          </AuthInitializer>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  );
};

export default App; 