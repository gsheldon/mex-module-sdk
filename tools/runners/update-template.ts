import * as fs from "fs";
import {basePath} from "../config";
import fse = require('fs-extra');
import extract from "extract-zip";
import {resolve} from "path";
import {sh} from "../utils";
import {forEach} from "lodash";

const Downloader = require("nodejs-file-downloader");

export async function run() {
    console.log("start running init")

    console.log("--- Downloading mex-module SDK ----")
    await downloadMexModuleSdk()
    console.log("--- Downloading mex-module SDK Finished ----")


    console.log("--- NPM Restore Engine ----")
    await npmRestoreTools()
    console.log("--- NPM Restore Engine Finished ----")
}

let downloadMexModuleSdk = async function () {
    let path = "https://github.com/Skedulo/mex-module-sdk/archive/refs/heads/master.zip"
    let storePath = basePath
    let tmpPath = basePath + "/tmp"
    let fileName = "mex-module-sdk.zip"

    deleteFolderRecursiveContent(tmpPath)

    const downloader = new Downloader({
        url: path, //If the file name already exists, a new file with the name 200MB1.zip is created.
        directory: tmpPath, //This folder will be created, if it doesn't exist.
        fileName: fileName
    });

    const {filePath, downloadStatus} = await downloader.download(); //Downloader.download() resolves with some useful properties.

    if (downloadStatus != 'COMPLETE') {
        return
    }

    let zipFilePath = filePath

    const resolve = require('path').resolve

    await extract(resolve(zipFilePath), { dir: resolve(tmpPath) })

    let filesInTempPath = fs.readdirSync(tmpPath + "/")

    let unzipFolderPath = filesInTempPath.filter(f => !f.endsWith(".zip"))[0]

    unzipFolderPath = tmpPath + "/" + unzipFolderPath

    let pathsToCopy = ["/template", "/tools"]
    pathsToCopy.forEach((pathToCopy) => {
        deleteFolderRecursiveContent(storePath + pathToCopy)
        fs.cpSync(unzipFolderPath + pathToCopy, storePath + pathToCopy, { recursive: true })
    })

    fs.unlinkSync(zipFilePath)
    deleteFolderRecursive(unzipFolderPath)
}

let npmRestoreTools = async function () {
    await sh([
        "./build-tools.sh"
    ])
}

const deleteFolderRecursive = function(path: string) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file) {
            let curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

const deleteFolderRecursiveContent = function(path: string) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file) {
            let curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
    }
};
