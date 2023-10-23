let argv = require('minimist')(process.argv.slice(2));

async function run() {
    let actionType = argv["_"][0];

    switch(actionType) {
        case "init":
            (await import("./runners/init") as any).run()
            break
        case "create-module":
            (await import("./runners/create-module") as any).run(argv)
            break;
        case "create-form":
            (await import("./runners/create-form") as any).run(argv)
            break;
        case "install-form":
            (await import("./runners/install-form") as any).run(argv)
            break;
    }
}

run();
