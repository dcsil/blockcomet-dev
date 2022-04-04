
import axios from 'axios'
import { serverUrl } from './config'

export const makeGetReq = async (url, token = null) => {
    return await axios({
        method: 'get',
        url: `${serverUrl}/${url}`,
        headers: { "Authorization": `Bearer ${token}` }
    })
        .then((response) => {
            if (response.status == 200) {
                return response
            }
        }).catch((err) => {
            console.log("logout error", err)
        })
}
