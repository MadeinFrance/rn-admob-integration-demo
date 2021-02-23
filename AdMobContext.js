/* @flow  */

import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import {Platform, View} from 'react-native';

import admob, {
  MaxAdContentRating,
  BannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
} from '@react-native-firebase/admob';

// const newAndroidTestBannerId = 'ca-app-pub-6877747518488921/9008909524';
const adUnitId = __DEV__
  ? TestIds.BANNER
  : Platform.OS === 'ios'
  ? 'ca-app-pub-6877747518488921/7325640266'
  : 'ca-app-pub-6877747518488921/9568660228';

const interstitialAdUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : Platform.OS === 'ios'
  ? 'ca-app-pub-6877747518488921~6266780865'
  : 'ca-app-pub-6877747518488921~7133139977';

const adBannerDefaultHeight = 70;

export type AdMobContextType = {|
  adMobConfigurationLoaded: boolean,
  showInterstitial: Function,
  AdBanner: any,
  adBannerHeight: number,
|};

const AdMobContext = createContext<AdMobContextType>({
  adMobConfigurationLoaded: false,
  showInterstitial: () => {},
  AdBanner: <View />,
  adBannerHeight: 0,
});

let interstitial = InterstitialAd.createForAdRequest(interstitialAdUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

const AdMobProvider = ({children}: {|children: any|}) => {
  const [adBannerHeight, setAdBannerHeight] = useState(0);
  const [adMobConfigurationLoaded, setAdMobConfigurationLoaded] = useState(
    false,
  );
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);

  useEffect(() => {
    const eventListener = interstitial.onAdEvent((type, error) => {
      if (type === AdEventType.error) {
        console.error('error', error);
      }
      if (type === AdEventType.LOADED) {
        setInterstitialLoaded(true);
      }
    });

    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
  }, [interstitialLoaded]);

  const setRequestConfiguration = useCallback(async () => {
    setAdBannerHeight(adBannerDefaultHeight);

    admob().setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.G,
      tagForChildDirectedTreatment: false,
      tagForUnderAgeOfConsent: false,
    });
  }, []);

  useEffect(() => {
    setRequestConfiguration()
      .then(() => {
        setAdMobConfigurationLoaded(true);
      })
      .catch((error) => {
        console.error('error', error);
      });
  }, [setRequestConfiguration]);

  const AdBanner = useMemo(
    () =>
      adMobConfigurationLoaded && (
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: false,
          }}
          onAdLoaded={async () => {
            console.log('banner loaded');
          }}
          onAdFailedToLoad={async (error) => {
            console.log('AdFailedToLoad for adUnitId ', adUnitId, error);
            setAdBannerHeight(0);
          }}
        />
      ),
    [adMobConfigurationLoaded],
  );

  const showInterstitial = useCallback(() => {
    if (!interstitialLoaded) {
      console.log('insterstitial not loaded');
      return;
    }
    interstitial.show();

    interstitial = InterstitialAd.createForAdRequest(interstitialAdUnitId, {
      requestNonPersonalizedAdsOnly: false,
    });

    setInterstitialLoaded(false);
  }, [interstitialLoaded]);

  const value = useMemo(
    () => ({
      adMobConfigurationLoaded,
      AdBanner,
      adBannerHeight,
      showInterstitial,
    }),
    [AdBanner, adBannerHeight, adMobConfigurationLoaded, showInterstitial],
  );

  return (
    <AdMobContext.Provider value={value}>{children}</AdMobContext.Provider>
  );
};

export {AdMobContext, AdMobProvider};
