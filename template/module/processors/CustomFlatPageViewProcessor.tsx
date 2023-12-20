import React from "react";
import {View} from "react-native";
import {
    AbstractFlatPageViewProcessor,
    ListPageProcessorInterface,
    StandardComponentArgs,
    StandardComponentProps,
} from "@skedulo/mex-engine-proxy";
import {BaseComponentModel} from "@skedulo/mex-types";

type CustomFlatPageViewArgs = StandardComponentArgs<CustomFlatPageViewComponentModel> & {}

type CustomFlatPageViewProps = StandardComponentProps<CustomFlatPageViewArgs, CustomFlatPageViewComponentModel>

interface CustomFlatPageViewComponentModel extends BaseComponentModel {
}
export default class CustomFlatPageViewProcessor extends AbstractFlatPageViewProcessor<CustomFlatPageViewProps, CustomFlatPageViewArgs, CustomFlatPageViewComponentModel> implements ListPageProcessorInterface {

    getTypeName(): string {
        return "CustomFlatPageView";
    }

    generateInnerComponent(args: CustomFlatPageViewArgs): JSX.Element {
        return <View style={{flex: 1}}>
            Your custom list item layout
        </View>
    }
}