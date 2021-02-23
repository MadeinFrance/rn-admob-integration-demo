import React, {useMemo, useContext} from 'react';
import {View, StyleSheet} from 'react-native';

import {AdMobContext} from './AdMobContext';

const AdBannerElement = (props: any) => {
  const {AdBanner} = useContext(AdMobContext);

  return useMemo(() => <View style={styles.container}>{AdBanner}</View>, [
    AdBanner,
  ]);
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 99,
  },
});

export default AdBannerElement;
