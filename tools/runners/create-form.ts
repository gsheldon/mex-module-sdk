import fs = require('fs');
import fse = require('fs-extra');

import {basePath} from "../config";

let argv = require('minimist')(process.argv.slice(2));

export async function run() {
    let formName = argv["_"].slice(1).join(" ");
    console.log("formName", formName)

    let formDefId = formName.split(" ").join("_")
    console.log("formDefId", formDefId)

    let targetModuleFolder = basePath + `/forms/${formDefId}`
    let templateFolder = basePath + '/template/form'

    // now copy everything
    fse.copySync(templateFolder, targetModuleFolder)

    // after successfully copy, change the module name
    let fileContent = fs.readFileSync(targetModuleFolder + "/upload_config.json", 'utf-8')

    fs.writeFileSync(targetModuleFolder + "/upload_config.json", fileContent
        .replace("$$FORM_NAME$$", formName)
        .replace("$$DEF_ID$$", formDefId))
}
