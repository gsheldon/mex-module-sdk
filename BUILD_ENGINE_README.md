## Get this repo
Probably, you will need to get this repo down to your machine in order to build the mex-engine

## Init the tools
Run `./build-tools.sh`

## Get engine
In order to build engine, we need to download the engine
`./run.sh get-engine`

## Merge modules
If the tenants have multiple modules, we need to download the related modules and extract them into this location:
- ./modules

Then, in the modules_config.json, the `modules_config.json` need to register the modules it want to build together.
For example, let's say, we have multiple modules as
- ./modules/ModuleA
- ./modules/ModuleB

In the `modules_config.json`, it will look like this
```json
{
  "ModuleA": {},
  "ModuleB": {}
}
```

After all the steps, run: `./run.sh merge-module`, it will start merging the modules

## Build Engine
After all the above steps, the Android and iOS is ready to be built:

iOS:
``

Android:
``

Here is the old script that we use to build engine before, you should just probably follow this step:

First, `cd ./engine`

Then follow thi script to bundle

```shell
MEX_VERSION='DEFINE_YOUR_MEX_VERSION' # ex: 1.7.15 

ANDROID_BUNDLE_FILE="android$MEX_VERSION.zip"
IOS_BUNDLE_FILE="ios$MEX_VERSION.zip"

# create android/ios bundle
npx react-native bundle --platform android --dev false --entry-file index.tsx --bundle-output output/android/index.bundle --assets-dest output/android
npx react-native bundle --platform ios --dev false --entry-file index.tsx --bundle-output output/ios/index.bundle --assets-dest output/ios

if [ $? -eq 0 ]; then
    echo "====Successfully Bundle====="
else
    echo "----Can't bundle-----"
    exit 1
fi

# zip and upload android bundle
BASEDIR="$(cd "$(dirname "$0")" && pwd)"
cd "$BASEDIR/output/android"
echo "Zipping Android bundle"
zip -r "$ANDROID_BUNDLE_FILE" ./*

echo "---Uploading Android bundle"
CURL_OUTPUT=$(curl --location -g --request POST "$BASE_API_URL/form/engine/$MEX_VERSION/$APP_VERSION/android" \
  --header "Authorization: Bearer $ADMIN_CONSOLE_TOKEN" \
  --form "bundle=@\"./$ANDROID_BUNDLE_FILE\"")

if [ $CURL_OUTPUT = "{\"result\":\"${MEX_VERSION}_android.zip\"}" ]; then
  echo "\n====Successfully Upload Android bundle===="
else
    echo "\n----Can't Upload Android bundle-----"
    echo "$CURL_OUTPUT"
    exit 1
fi

# zip and upload ios bundle
cd "$BASEDIR/output/ios"

echo "---Zipping iOS bundle"
zip -r "$IOS_BUNDLE_FILE" assets index.bundle
```

In the end, it will output 2 zip files at:
- `./engine/output/ios/ios$MEX_VERSION.zip` - iOS
- `./engine/output/android/ios$MEX_VERSION.zip` - Android

That's all of it, you will have 2 engines, 1 engine for iOS/ 1 engine for Android at the end.
