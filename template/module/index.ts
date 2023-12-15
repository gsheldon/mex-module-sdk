import CustomScreen from "./Screens/CustomScreen";
import {CustomComponentRegistry, CustomComponentRegistryImpl} from "@skedulo/mex-engine-proxy";
import CustomListItemViewProcessor from "./processors/CustomListItemViewProcessor";
import CustomFlatPageViewProcessor from "./processors/CustomFlatPageViewProcessor";

const moduleName = "$$MODULE_NAME$$"

function main(): CustomComponentRegistry {

    let registry = new CustomComponentRegistryImpl(moduleName)

    registry.registerFlatPageComponentProcessor(new CustomFlatPageViewProcessor())
    registry.registerListPageItemComponentProcessor(new CustomListItemViewProcessor())

    registry.registerScreen({
        screen: CustomScreen,
        key: "CustomScreen"
    })

    return registry
}

export default main
