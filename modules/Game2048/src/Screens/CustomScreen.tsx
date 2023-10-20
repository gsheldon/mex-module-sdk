import * as React from 'react'

import Container from "./game/components/container";

type Props = {
    route: any,
    navigation: any
}

const Game2048Screen: React.FC<Props> = ({route, navigation}) => {
    return (<Container startTiles={2} size={4} />)
}

export default Game2048Screen
