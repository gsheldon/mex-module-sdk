import {CustomComponentRegistry, CustomComponentRegistryImpl} from "@skedulo/mex-engine-proxy";
import Game2048LeaderboardScreen from "./Screens/Game2048LeaderboardScreen";
import Game2048Screen from "./Screens/Game2048Screen";

const moduleName = "Game2048"

function main(): CustomComponentRegistry {

    let registry = new CustomComponentRegistryImpl(moduleName)

    registry.registerScreen({
        screen: Game2048Screen,
        key: "Game2048Screen"
    })

    registry.registerScreen({
        screen: Game2048LeaderboardScreen,
        key: "Game2048LeaderboardScreen"
    })

    return registry
}

export default main
