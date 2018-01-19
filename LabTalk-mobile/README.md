# LabTalk-mobile
* Directory "app" is for running Android Studio for phone simulator
## How to release 
1. 要上架需數位簽證(先跳過)

1. Bundle 
   * react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output     android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
   
   **--entry-file：JS檔入口文件，以我的專案來說，index.ios.js是我iOS的入口**
   
   **--platform：ios或android**
   
   **--dev：是否在開發環境，默認值為true**
   
   **build configuration也設置為Release**
   
   **(C:\Users\user\Desktop\LabTalk-mobile\Labtalkmobile\android\app\build\generated\source\buildConfig\release\com\labtalkmobile)**


   
1. 測試 
  * react-native run-android --variant=release

1. 生成APK(in android/app/build/outputs/apk/app-release.apk)
  * cd android 
  * gradlew assembleRelease (產生APK)
