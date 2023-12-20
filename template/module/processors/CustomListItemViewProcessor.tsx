import React from "react";
import {View} from "react-native";
import {
    AbstractProcessor,
    ListPageProcessorInterface,
    StandardComponentArgs,
    StandardComponentProps,
} from "@skedulo/mex-engine-proxy";
import {BaseComponentModel} from "@skedulo/mex-types";

type CustomListItemViewArgs = StandardComponentArgs<CustomListItemViewComponentModel> & {}

type CustomListItemViewProps = StandardComponentProps<CustomListItemViewArgs, CustomListItemViewComponentModel>

interface CustomListItemViewComponentModel extends BaseComponentModel {
}
export default class CustomListItemViewProcessor extends AbstractProcessor<CustomListItemViewProps, CustomListItemViewArgs, CustomListItemViewComponentModel> implements ListPageProcessorInterface {

    getTypeName(): string {
        return "CustomListItemView";
    }

    generateInnerComponent(args: CustomListItemViewArgs): JSX.Element {
        return <View style={{flex: 1}}>
            Your custom list item layout
        </View>
    }
}