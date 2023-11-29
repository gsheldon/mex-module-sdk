import {createReadStream, existsSync, readFileSync} from 'fs';
const FormData = require('form-data'); // npm install --save form-dataÏ
import axios, {AxiosError} from "axios";
import lodash from "lodash";
import * as fs from "fs";
import {basePath} from "../config";
import chalk from "chalk";

let exec = require('child_process').exec;

const DEFAULT_URL="DEV"

let URLS = {
    "DEV": [
        "https://dev-api.test.skl.io",
        "https://dev-api.au.test.skl.io"
    ],
    "PERF": [
      "https://api.perf.skl.io"
    ],
    "STAGING": [
        "https://staging-api.test.skl.io",
        "https://staging-api.au.test.skl.io"
    ],
    "PROD": [
        "https://api.skedulo.com",
        "https://api.au.skedulo.com",
        "https://api.uk.skedulo.com",
        "https://api.ca.skedulo.com",
    ]
}

export async function run(argv: any) {
    try {
        let token = argv["t"]
        let folder = argv["f"]
        let env = argv["e"] ?? DEFAULT_URL

        let urls = URLS[env.toUpperCase()]

        if (!token) {
            throw Error("Missing token, please use -t to define admin token")
        }

        const folderPath = `${basePath}/${folder}`

        const folderPathParts = folderPath.split("/")
        const folderName = folderPathParts[folderPathParts.length - 1]

        async function processModule(folderPath: string) : Promise<void> {

            let failedUploadUrls = []

            const archiver = require('archiver')

            const zipDestination = basePath + `/tmp/${folderName}.zip`

            logProcess("Start zipping module")

            const archive = archiver('zip', { zlib: { level: 9 }});

            if (existsSync(zipDestination)) {
                fs.unlinkSync(zipDestination);
            }

            const stream = fs.createWriteStream(zipDestination);

            const promise = new Promise((resolve, reject) => {
                archive
                    .directory(folderPath, false)
                    .on('error', err => reject(err))
                    .pipe(stream);

                stream.on('close', () => resolve(null));
                archive.finalize();
            });

            await promise

            logProcess("Done zipping module", true)

            logProcess("Uploading module")

            const uploadModuleForEnv = async function(envUrl: string)  : Promise<void> {
                logProcess("Uploading module for " + envUrl)

                // Check if module already exists or not


                let moduleExisted = false

                try {
                    let result = await axios.get(`${envUrl}/form/module/fetch/${folderName}`, {
                        headers: {
                            "Authorization" : "Bearer " + token,
                            "X-Skedulo-Name": `${folderName}.zip`
                        }
                    })

                    if (result.data?.result?.uid) {
                        moduleExisted = true

                        console.log(chalk.blueBright("Module already existed - Update module"))
                    }
                } catch (e) { }

                try {
                    if (!moduleExisted) {
                        // Insert
                        const formData = new FormData();
                        formData.append("file", createReadStream(zipDestination));
                        formData.append("name", folderName)

                        let resultFromUploadFile = await axios.post(`${envUrl}/form/module`, formData, {
                            headers: {
                                "Authorization" : "Bearer " + token,
                                "X-Skedulo-Name": `${folderName}.zip`
                            }
                        })

                        if (resultFromUploadFile.status != 200)
                            throw new Error("Failed to load form definition")
                    } else {
                        // Update
                        const formData = new FormData();
                        formData.append("file", createReadStream(zipDestination));

                        let resultFromUploadFile = await axios.post(`${envUrl}/form/module/update/${folderName}`, formData, {
                            headers: {
                                "Authorization" : "Bearer " + token,
                                "X-Skedulo-Name": `${folderName}.zip`
                            }
                        })

                        if (resultFromUploadFile.status != 200)
                            throw new Error("Failed to load form definition")
                    }

                } catch (e) {
                    failedUploadUrls.push(envUrl)

                    console.log("Failed to upload module for " + envUrl, e)
                }

                logProcess("Done Uploading module for " + envUrl)
            }

            for(let index in urls) {
                let url = urls[index]

                logProcess("Processing module for " + url)

                await uploadModuleForEnv(url)

                logProcess("Done Processing module for " + url, true)
            }

            logProcess("Done Uploading module", true)

            if (failedUploadUrls.length > 0) {
                console.log(chalk.red.bgWhite.bold('HOLD UP!!!'));

                console.log(chalk.red.bgWhite.bold("These environment has been failed to upload"), failedUploadUrls)
            }
        }

        // await deleteModuleIfExisted()
        await processModule(folderPath)
        console.log("Install successfully");

    } catch (err) {
        if (err instanceof AxiosError) {
            console.log("error when calling API", err.request)
            console.log("api response", JSON.stringify(err.response.data))
        } else {
            console.log("error", err)
        }

        console.log("Failed:", err.message);
    }
}

function logProcess(message: string, end?: boolean) {
    console.log(`------ ${message} ------`)

    if (end)
        console.log("")
}
