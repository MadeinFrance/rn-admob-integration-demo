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

## Android issue

* Ad banner not showing. `AdFailedToLoad [Error: [admob/error-code-no-fill] The ad request was successful, but no ad was returned due to lack of ad inventory.]`
* Interstitial not loading: `insterstitial not loaded`

## iOS issue

Ad banner works ✅ but interstitial is never loading in RELEASE mode

<hr>

See folders screenshots.
