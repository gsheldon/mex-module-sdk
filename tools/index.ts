import fs = require('fs');

let argv = require('minimist')(process.argv.slice(2));

async function run() {
    let actionType = argv["_"][0];

    switch(actionType) {
        case "init":
            (await import("./init") as any).run()
    }
}

run();
