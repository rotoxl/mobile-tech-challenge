import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Tournaments from '../screens/Tournaments';
import { IntlProvider } from 'react-intl';
import { StatusBar, StyleSheet } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const DEFAULT_LOCALE = 'en-GB';

const BaseProvider = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={StyleSheet.absoluteFill}>
        <StatusBar barStyle="light-content" />
        <IntlProvider locale={DEFAULT_LOCALE}>
          <BottomSheetModalProvider>
            <Tournaments />
          </BottomSheetModalProvider>
        </IntlProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default BaseProvider;
