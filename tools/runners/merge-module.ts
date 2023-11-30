import fs = require('fs');
import fse = require('fs-extra');

import {basePath} from "../config";
import {shWithLogs} from "../utils";

let argv = require('minimist')(process.argv.slice(2));

export async function run() {
    let modulePath = basePath + '/modules'
    let mergeModuleToolFolder = basePath + '/engine/tools/MexModuleCodeGenerator/merge-module'
    let mergeModuleTool = mergeModuleToolFolder + '/mergeModule.js'

    console.log("Prepare tools")

    await shWithLogs([`cd ${mergeModuleToolFolder}`, 'npm install', 'tsc'])

    console.log("Running merge module")

    await shWithLogs([`node ${mergeModuleTool} --moduleFolder ${modulePath} --rootFolder engine`])

    console.log("Successfully merge module")
}
