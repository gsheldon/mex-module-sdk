# Folder structures
- forms: All test forms
- modules: All modules
- template: The template coming from https://github.com/Skedulo/mex-module-sdk

# Tutorial
## Init the tools
Run `./build-tools.sh`

## Create new form
Run `./run.sh create-form {NAME}`

## Install form
Run `./run.sh install-form -f {folderPath}`

## Create new module
Run `./run.sh create-module {NAME}`

## Install a module
Run `./run.sh instal-module -f {FOLDER_PATH} -t {ADMIN_TOKEN} - e  {'DEV'|'STAGING'|'PROD'}`


## Debugging local
First, you need to get the engine by running:
`./run.sh get-engine`

Optional: If you have any custom modules, then run
`./run.sh merge-module`

Then run:
`./start-engine.sh`

If you want to test the Forms locally, here is the steps:
- Go to `GlobalConfiguration.ts` file in "engine" folder. Set these variables to true in case you want to mock the dta
    - UseLocalInstanceData: Mock local data
        - Local source data: /local_data/instance_data.json
    - UseLocalStaticData: Mock static data
        - Local source data: /local_data/static_data.json
    - UseLocalUIDefinition: Mock ui def
        -  Local source data: /local_data/ui_def.json
    - UseLocalTranslationFiles: Mock localization files
        - Local source data: /local_data/resources/locale/en.json
