import fs from "fs";

export const basePath = '.'

export const URLS = {
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

export let DEFAULT_ADMIN_TENANT_TOKEN = ""
export let DEFAULT_TENANT_ENVIRONMENT_URL = ""

try {
    let file = JSON.parse(fs.readFileSync(`${basePath}/config/environment.json`, 'utf-8'))

    DEFAULT_ADMIN_TENANT_TOKEN = file.DEFAULT_ADMIN_TENANT_TOKEN
    DEFAULT_TENANT_ENVIRONMENT_URL = file.DEFAULT_TENANT_ENVIRONMENT_URL
} catch {}
