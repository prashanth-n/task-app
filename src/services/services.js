import axios from 'axios'
const ENDPOINT = process.env.VUE_APP_API_ENDPOINT;
const getToken = () => JSON.parse(localStorage.getItem('token'))
const getCall = ({ url, data }) => {
    return axios.get(ENDPOINT + url, data)
}
const authGetCall = ({ url }) => {
    const token = getToken()
    let config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axios.get(ENDPOINT + url, config)
}
const postCall = ({ url, data }) => {
    return axios.post(ENDPOINT + url, data)
}
const authPostCall = ({ url, data }) => {
    const token = getToken()
    let config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return axios.post(ENDPOINT + url, data, config)
}
export default {
    getCall,
    postCall,
    authPostCall,
    authGetCall,
    getToken
}