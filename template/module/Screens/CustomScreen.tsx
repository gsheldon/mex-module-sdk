import * as React from 'react'
import {useContext, useRef} from 'react'
import {ContextProxy, CoreContainer, ServicesProxy} from "@skedulo/mex-engine-proxy";
import {View, Text} from "react-native";

type Props = {
    route: any,
    navigation: any
}

const CustomScreen: React.FC<Props> = ({route, navigation}) => {
    // Page data store as ref, so in case InstanceDataContext is changed, it won't lose the current data
    let pageDataRef = useRef<any>();

    const themeContext = CoreContainer.get(ContextProxy.ThemeContext)
    const instanceDataContext = CoreContainer.get(ContextProxy.InstanceContext)

    // Force Subscribe to theme changed
    useContext(themeContext)
    // Force Subscribe to data changed
    useContext(instanceDataContext)

    return (
        <View style={{flex: 1, alignItems: "center"}}>
            <Text style={{
                marginTop: 16,
                fontSize: 25,
                alignSelf: "center",
                alignContent: "center"}}>Welcome to Custom extension</Text>
        </View>)
}

export default CustomScreen
