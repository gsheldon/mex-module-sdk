#!/bin/bash
#Check if jq is installed or not
command -v jq >/dev/null 2>&1 || {
  echo >&2 "You need to install jq third party first."
  echo "Run command \"brew install jq\" to install jq"
  exit 1
}

while getopts "f:t:u:" opt; do
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
zipstatic_resources() {
  ORIGINAL_FOLDER=$(pwd)
  cd "$FOLDER/mex_definition/static_resources"
  rm -f "static_resources.zip"
  zip -r "static_resources.zip" $(ls | tr "\n" " ")
  cd $ORIGINAL_FOLDER
}
echo "Zip static_resources folder"
zipstatic_resources
