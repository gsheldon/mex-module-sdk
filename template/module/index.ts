import CustomScreen from "./Screens/CustomScreen";
import {CustomComponentRegistry, CustomComponentRegistryImpl} from "@skedulo/mex-engine-proxy";

const moduleName = "$$MODULE_NAME$$"

function main(): CustomComponentRegistry {

    let registry = new CustomComponentRegistryImpl(moduleName)

    registry.registerScreen({
        screen: CustomScreen,
        key: "CustomScreen"
    })

    return registry
}

export default main
