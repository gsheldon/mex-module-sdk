import {APIResult, CoreContainer, HooksProxy, IAPIHooks, ServicesProxy} from "@skedulo/mex-engine-proxy";
import axios, {Axios, AxiosRequestConfig} from "axios";

const query = `query fetchGame2048RankingObject {
    game2048RankingObject(orderBy: \"Points DESC\") {
        totalCount
        edges {
            cursor
            offset
            node {
                Points
                ResourceId
                UID
                Resource {
                    Name
                }
                CreatedDate
            }
        }
    }
}`

const insertQuery = `mutation insertRankingObject {
    schema {
        insertGame2048RankingObject(input: {
            Points: $$POINTS$$,
            ResourceId: "$$RESOURCE_ID$$"
        })
    }
}`

export type RankingObject = {
    Points: string,
    Resource: {
        Name: string
    }
}

export const useRankingsAPI = (): APIResult<RankingObject[]> => {
    let result = CoreContainer.get(HooksProxy.APIHooks).useSkedAPI({
        url: "/graphql/graphql",
        method: "POST",
        data: {
            variables: {},
            query: query,
            operationName: "fetchGame2048RankingObject"
        }
    })

    // Transform data
    if (result.data) {
        result.data = result.data.data.game2048RankingObject.edges ?? []
        result.data = result.data.map(d => d.node)
    }

    return result
}

export const postRanking = async (points: number): Promise<boolean> => {
    const assetsManager = CoreContainer.get(ServicesProxy.AssetsManager)

    const accessToken = await assetsManager.getAccessToken()
    const baseUrl = await assetsManager.getAPIUrl()

    let finalQuery = insertQuery.replace("$$POINTS$$", points.toString()).replace("$$RESOURCE_ID$$", assetsManager.cachedContextId.toString())

    let result = await axios.post('/graphql/graphql', {
        variables: {},
        query: finalQuery,
        operationName: "insertRankingObject"
    }, {
        headers: {
            "Authorization": "Bearer " + accessToken,
        },
        method: "post",
        baseURL: baseUrl
    } as AxiosRequestConfig)

    return result.status == 200;
}
