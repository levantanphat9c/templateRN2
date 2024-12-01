#!/bin/bash

# Check input parameters
if [ "$1" != "ios" ] && [ "$1" != "android" ]; then
    echo "Sử dụng: $0 [ios|android]"
    exit 1
fi

PLATFORM=$1
OUTPUT_DIR="./output/$PLATFORM"

# Determine the file extension based on the platform
if [ "$PLATFORM" = "ios" ]; then
    FILE_EXT="ipa"
else
    FILE_EXT="apk"
fi

# Find the latest file
APPNAME=$(ls -t "$OUTPUT_DIR" | grep "$FILE_EXT" | head -n 1)
if [ -z "$APPNAME" ]; then
    echo "File not found .$FILE_EXT trong $OUTPUT_DIR"
    exit 1
fi

testfairy() {
    curl https://upload.testfairy.com/api/upload -F api_key='2e9f4be8fddce1cc49eec49c1bc5afa1856828dd' -F file=@"$1" -F auto-update='on'
}

testfairy "$OUTPUT_DIR/$APPNAME"