import * as React from 'react'

import Container from "./game/components/container";
import NavigationProcessManager from "../../../common/NavigationProcessManager";
import {useLayoutEffect} from "react";
import {postRanking} from "../hooks/useRankingsAPI";
import InternalUtils from "../../../common/InternalUtils";

type Props = {
    route: any,
    navigation: any
}

const Game2048Screen: React.FC<Props> = ({route, navigation}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            "title": "2048"
        })
    },[])

    const onFinish = (highestScore) => {

        postRanking(highestScore)
            .then(() => {
                InternalUtils.navigation.exit()
            })
    }

    const goToLeaderboard = () => {
        NavigationProcessManager.navigate("Game2048_Game2048LeaderboardScreen", {})
    }

    return (<Container onFinish={onFinish} goToLeaderboard={goToLeaderboard} startTiles={2} size={4} />)
}

export default Game2048Screen
