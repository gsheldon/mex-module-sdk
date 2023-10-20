import Game2048Screen from "./Screens/CustomScreen";
import {CustomComponentRegistry, CustomComponentRegistryImpl} from "@skedulo/mex-engine-proxy";

const moduleName = "Game2048"

function main(): CustomComponentRegistry {

    let registry = new CustomComponentRegistryImpl(moduleName)

    registry.registerScreen({
        screen: Game2048Screen,
        key: "Game2048Screen"
    })

    return registry
}

export default main
