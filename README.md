# rn-admob-integration-demo

(Secrets have been stripped out can be given via PM)

## App.js renders:

 * Ad Banner
 * Interstitial trigger

```
<AdMobProvider>
  <View style={styles.fullScreenContainer} pointerEvents="box-none">
    <Text style={styles.sectionTitle}>Test Ads Demo</Text>
    <InterstitialTrigger />
    <AdBannerElement /> 
  </View>
</AdMobProvider>
```
