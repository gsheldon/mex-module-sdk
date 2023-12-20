import React from "react";
import {View} from "react-native";
import {
    StandardComponentArgs,
    StandardComponentProps,
    AbstractCustomFlatPageViewProcessor
} from "@skedulo/mex-engine-proxy";
import {BaseComponentModel} from "@skedulo/mex-types";

type CustomFlatPageViewArgs = StandardComponentArgs<CustomFlatPageViewComponentModel> & {}

type CustomFlatPageViewProps = StandardComponentProps<CustomFlatPageViewArgs, CustomFlatPageViewComponentModel>

interface CustomFlatPageViewComponentModel extends BaseComponentModel {
}

export default class CustomFlatPageViewProcessor extends AbstractCustomFlatPageViewProcessor<CustomFlatPageViewProps, CustomFlatPageViewArgs, CustomFlatPageViewComponentModel>{
    getCustomProcessorTypeName(): string {
        return "CustomFlatPageView"
    }

    generateInnerComponent(args: CustomFlatPageViewArgs): JSX.Element {
        return <View style={{flex: 1}}>
            Your custom flat page view
        </View>
    }
}