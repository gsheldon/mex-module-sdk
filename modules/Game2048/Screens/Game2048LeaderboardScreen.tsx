import * as React from 'react'

import Container from "./game/components/container";
import {RankingObject, useRankingsAPI} from "../hooks/useRankingsAPI";
import {ActivityIndicator, FlatList, Text, View} from "react-native";
import {inspect} from "util";
import {useLayoutEffect, useState} from "react";
import {text} from "stream/consumers";
import Dimensions from "./game/utils/dimensions";
import {CoreContainer, UtilsProxy} from "@skedulo/mex-engine-proxy";

type Props = {
    route: any,
    navigation: any
}

const Game2048LeaderboardScreen: React.FC<Props> = ({route, navigation}) => {

    let backgroundColor = "#faf8ef";
    let textColor = "#776E65"

    const apiResult = useRankingsAPI()

    useLayoutEffect(() => {
        navigation.setOptions({
            "title": "Leaderboard"
        })
    },[])

    if (apiResult.isLoading) {
        return (<ActivityIndicator style={{height: 40, width: 40}} />)
    }

    const renderItem = ({item, index}) => {
        return (<Row item={item} />)
    }

    return (
        <View style={{flex: 1, paddingHorizontal: 16, paddingTop: 16, backgroundColor: backgroundColor}}>

            <FlatList
                data={apiResult.data}
                renderItem={renderItem}
                keyExtractor={(i, index) => index.toString()}
            />
        </View>)
}

const Row = ({item}) => {
    let textColor = "#776E65"

    let extHelper = CoreContainer.get(UtilsProxy.ExtHelper)

    let [createdDate, setCreatedDate] = useState("");

    extHelper.date.getLocaleDateDisplay(item.CreatedDate, 'datetime', 'local').then((val) => {
        setCreatedDate(val ?? "")
    })

    return (
        <View style={{ flexDirection: "column", marginTop: 16}}>
            <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: textColor,
                textAlign: "center",
                lineHeight: Dimensions.size["8"],
            }}>{item.Resource.Name}</Text>

            <Text style={{marginTop: 8, color: textColor, textAlign: "center",}}>Points: {item.Points}</Text>

            <Text style={{marginTop: 8, color: textColor, textAlign: "center",}}>At: {createdDate}</Text>
        </View>)
}

export default Game2048LeaderboardScreen
