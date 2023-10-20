import fs = require('fs');
import fse = require('fs-extra');

import {basePath} from "./config";

let argv = require('minimist')(process.argv.slice(2));

export async function run() {
    let moduleName = argv["_"][1];
    let targetModuleFolder = basePath + `/modules/${moduleName}`
    let templateFolder = basePath + '/template'

    // now copy everything
    fse.copySync(templateFolder, targetModuleFolder)

    // after successfully copy, change the module name
    let fileContent = fs.readFileSync(targetModuleFolder + "/index.ts", 'utf-8')

    fs.writeFileSync(targetModuleFolder + "/index.ts", fileContent.replace("$$MODULE_NAME$$", moduleName))
}
