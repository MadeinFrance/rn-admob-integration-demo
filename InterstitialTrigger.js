/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext} from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {AdMobContext} from './AdMobContext';

const InterstitialTrigger = () => {
  const {showInterstitial} = useContext(AdMobContext);

  return (
    <Pressable
      onPress={() => {
        showInterstitial();
      }}
      style={styles.showInterstialButton}>
      <Text style={styles.btnTitle}>Show interstitial</Text>
    </Pressable>
  );
};

export default InterstitialTrigger;

const styles = StyleSheet.create({
  showInterstialButton: {
    zIndex: 999999,
    borderWidth: 1,
  },

  btnTitle: {
    color: Colors.dark,
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
});
