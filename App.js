/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {AdMobProvider} from './AdMobContext';

import InterstitialTrigger from './InterstitialTrigger';
import AdBannerElement from './AdBannerElement';

const App: () => React$Node = () => {
  return (
    <>
      <AdMobProvider>
        <View style={styles.fullScreenContainer} pointerEvents="box-none">
          <Text style={styles.sectionTitle}>Test Ads Demo</Text>
          <InterstitialTrigger />
          <AdBannerElement />
        </View>
      </AdMobProvider>
    </>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
