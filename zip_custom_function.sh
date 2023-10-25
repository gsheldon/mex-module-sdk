#!/bin/bash
#Check if jq is installed or not
command -v jq >/dev/null 2>&1 || {
  echo >&2 "You need to install jq third party first."
  echo "Run command \"brew install jq\" to install jq"
  exit 1
}

while getopts "f:" opt; do
  case "$opt" in
  f) FOLDER="$OPTARG" ;;
  ?) helpFunction ;; # Print helpFunction in case parameter is non-existent
  esac
done

helpFunction() {
  echo ""
  echo "Usage: $0 -f folder"
  exit 1 # Exit script after printing help
}

# Print helpFunction in case parameters are empty
if [ -z "$FOLDER" ]; then
  echo "Error: No folder is specified"
  helpFunction
fi

# Zip
CUSTOM_FUNCTION_FOLDER="$FOLDER/custom_functions"

# Check if custom function folder exists
if [ -d "$CUSTOM_FUNCTION_FOLDER" ]; then
  echo "CUSTOM_FUNCTION_FOLDER does exist."
  CUSTOM_FUNCTION_FEATURES=$(jq ".customFunctionFeatures" "./$FOLDER/upload_config.json" | tr -d '\n ' | sed 's/"/\\\"/g')
  echo "features=$CUSTOM_FUNCTION_FEATURES"
  cd "$CUSTOM_FUNCTION_FOLDER"
  rm -f customfunction.tar.gz && tar -czvf customfunction.tar.gz --exclude={".git","node_modules","dist","build","coverage"} .
fi
